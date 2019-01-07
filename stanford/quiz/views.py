import pytz
import datetime

from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.shortcuts import redirect
from django.db.models import Count
from django.core.files.base import File, ContentFile
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework import permissions, generics, mixins

from .utils import get_unanswered_questions, get_student_category_stats
from .utils import get_stats_student
from .models import Question, QuestionUserData, Category, Student, Feedback
from .models import Student, Category, Question, Answer, QuestionUserData, CategoryUserData, GVK_EMRI_Demographics
from .serializers import QuestionSerializer, QuestionUserDataSerializer, CategorySerializer, AnswerSerializer
from .serializers import StudentSerializer, UserSerializer, StudentStatsSerializer, CategoryUserDataSerializer, QuestionFeedbackSerializer
from .sheetreader import LoadFromCSV, LoadCategoryFromCSV

from django.contrib.auth.decorators import user_passes_test

def is_instructor(user):
    return user.is_authenticated() and (user.student.profile_type in ['ADMN', 'INST'] or user.is_superuser)

def is_admin(user):
    return user.is_authenticated() and (user.student.profile_type in 'ADMN' or user.is_superuser)

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return is_admin(request.user)

class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        return is_instructor(request.user)

# TODO: set up permissions for viewsets

class StudentViewSet(ModelViewSet):
    model = Student
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
    permission_classes = [IsInstructor]

    def retrieve(self, request, pk=None):
        if pk == 'self':
            pk = request.user.student.pk
            
        student_object = get_object_or_404(Student, pk=pk)
        serializer = StudentSerializer(instance=student_object)
        return Response(serializer.data)


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsInstructor]


class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsInstructor]


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryUserDataViewSet(ModelViewSet):
    serializer_class = CategoryUserDataSerializer
    lookup_field="category"

    def get_queryset(self):
        return CategoryUserData.objects.filter(student=self.request.user.student)


class QuestionUserDataViewSet(ModelViewSet):
    queryset = QuestionUserData.objects.all()
    serializer_class = QuestionUserDataSerializer


class StudentStatsViewSet(ViewSet):
    serializer_class = StudentStatsSerializer

    def get_date(self):
        date = request.GET.get('date', None)
        if date is not None:
            date = timezone.datetime.strptime(date, '%Y-%m-%d').astimezone(pytz.utc)
        return date

    def list(self, request):
        date = self.get_date()

        students_stats = []
        for student in Student.objects.all():
            students_stats.append(StudentStatsSerializer.student_to_stat(student, date))

        serializer = StudentStatsSerializer(instance=students_stats, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        if pk == 'self':
            pk = request.user.student.pk

        date = self.get_date()
        
        student = get_object_or_404(Student, pk=pk)
        StudentStatsSerializer.student_to_stat(student, date)

        serializer = StudentStatsSerializer(instance=stat)
        return Response(serializer.data)

class QuestionFeedbackViewSet(ViewSet):
    serializer_class = QuestionFeedbackSerializer
    permission_classes = [IsInstructor]

    def list(self, request):
        feedback = QuestionUserData.objects.exclude(feedback__isnull=True).values('question__text', 'question__id').annotate(count=Count("question")).order_by('-count')
        for q in feedback:
            q['question__feedback'] = []
            for i in QuestionUserData.objects.filter(question__id=q['question__id']):
                q['question__feedback'].append({'text': i.feedback.text, 'time': i.feedback.time, 'student': i.student.name})

        print(feedback)
        serializer = QuestionFeedbackSerializer(instance=feedback, many=True)
        print(serializer.data)
        return Response(serializer.data)

@login_required
def get_question(request):
    """
    Return random question from category that user hasn't done yet, create QuestionUserData model info
    :param request: GET request with category ID
    :return: JSONResponse of question
    """
    if request.method == 'GET':
        student = request.user.student
        if student:
            try:
                category = Category.objects.get(id=request.GET['category'])
            except (Category.DoesNotExist, KeyError):
                return JsonResponse({'accepted': False, 'reason': 'Missing or invalid category in request'}, status=400)

            if not student.category_data.filter(category=category).exists():
                CategoryUserData.objects.create(student=student, category=category)

            category_data = student.category_data.filter(category=category).first()

            started_question = QuestionUserData.objects.filter(question__category=category.id, student=student, answer=None)

            out_of_time = (category_data.time_completed or timezone.now()) > category_data.time_started + category.max_time

            if not out_of_time and started_question.exists():
                question = started_question.first().question
            else:
                # check for questions user has already started, exclude from final set
                question_set = get_unanswered_questions(student, category)

                stats = get_student_category_stats(category, student)
                if len(question_set) == 0 or out_of_time:
                    if category_data.time_completed is None:
                        category_data.time_completed = timezone.now()
                        category_data.save()

                    response = {'accepted': True,
                                'completed': True,
                                'out_of_time': True,
                                'num_attempted': stats['num_attempted'],
                                'num_correct': stats['num_correct']}
                    return JsonResponse(data=response)

                question = question_set[0]
                # create QuestionUserData as user has started to answer question
                question_data = QuestionUserData.objects.create(student=student, question=question)

            # strip out correctness indicators from answers
            question_json = QuestionSerializer(instance=question).data
            for answer in question_json['answers']:
                del answer['is_correct']

            return JsonResponse(data=question_json, status=200)
    else:
        return HttpResponse(status=405)


@login_required
def submit_answer(request):
    """
    Update QuestionUserData with time_completed, answer, etc. Check that question was completed in time allotted in
        Question model.
    Return JSON response in the following form:
    ```
        {
            question_id: [question_id],
            answer_id: [answer_id that user submitted],
            correct_answer: [list of correct answer_ids],
            reason: [text reason for correct answer
        }
    ```
    :param request: Post request with QuestionID and AnswerID
    :return: JSONResponse with above format
    """
    if request.method == 'POST':
        student = request.user.student
        if student:
            try:
                question_id = request.POST['question']
                answer_id = request.POST['answer']
            except (Category.DoesNotExist, KeyError):
                return JsonResponse({'accepted': False, 'reason': 'Missing or invalid question or answer in request'}, status=400)

            question = Question.objects.filter(id=question_id)
            answer = Answer.objects.filter(id=answer_id)
            if not question.exists():
                return JsonResponse({'accepted': False, 'reason': 'Question not found'}, status=404)
            elif not answer.exists():
                return JsonResponse({'accepted': False, 'reason': 'Answer not found'}, status=404)

            question = question.first()
            answer = answer.first()

            if answer.question != question:
                return JsonResponse({'accepted': False, 'reason': 'Answer not for specified question'}, status=400)

            user_data = student.question_data.filter(question=question)
            category_data = student.category_data.filter(category=question.category)

            if not user_data.exists():
                return JsonResponse({'accepted': False, 'reason': 'Question not started yet'}, status=404)

            if not category_data.exists():
                return JsonResponse({'accepted': False, 'reason': 'Category not started yet'}, status=404)

            user_data = user_data.first()
            category_data = category_data.first()

            end_time = category_data.time_started + question.category.max_time
            if user_data.answer is None and timezone.now() < end_time:
                user_data.answer = answer
                user_data.time_completed = timezone.now()
                user_data.save()

                return JsonResponse({'accepted': True, 'correct': answer.is_correct})
            elif timezone.now() >= end_time:
                return JsonResponse({'accepted': False, 'reason': 'Ran out of time'})
            else:
                return JsonResponse({'accepted': False, 'reason': 'Already answered'})
    else:
        return HttpResponse(status=405)


@login_required
def get_category_results(request):
    if request.method != 'GET':
        return HttpResponse(status=405)

    student = request.user.student
    if student:
        try:
            category = Category.objects.get(id=request.GET['category'])
        except (Category.DoesNotExist, KeyError):
            return JsonResponse({'accepted': False, 'reason': 'Missing or invalid category in request'}, status=400)

        category_data = student.category_data.filter(category=category)

        if not category_data.exists():
            return JsonResponse({'accepted': False, 'reason': 'Category not started yet'}, status=404)

        category_data = category_data.first()

        end_time = category_data.time_started + category.max_time

        question_set = get_unanswered_questions(student, category)
        if len(question_set) > 0 and timezone.now() <= end_time:
            return JsonResponse({'accepted': False, 'reason': 'Category has not yet been completed'}, status=400)

        result = []
        user_data = QuestionUserData.objects.filter(question__category=category, student=student)
        for qud in user_data:
            question = {
                'text': qud.question.text,
                'answers': [{"id": answer.id, "text": answer.text} for answer in qud.question.answers.all()],
                'correct': [answer.id for answer in qud.question.answers.filter(is_correct=True)],
                'selected': qud.answer.pk if qud.answer else None
            }
            result.append(question)
        return JsonResponse({'accepted': True, 'results': result})

    return HttpResponse(status=400)

@login_required
def get_stats(request):
    """
    Returns object of QuestionUserData statistics filtered by student, tags, difficulty
    :param request: POST request with a list of tags (strings) and list of difficulty (strings)
    :return: JSON response with format as follows 
    '''

    '''
    """
    if request.method != 'GET':
        return HttpResponse(status=405)

    student = request.user.student
    if student:
        try:
            tags = request.GET.getlist('tags')
            difficulties = request.GET.getlist('difficulties')
        except KeyError as e:
            print(e)
            return JsonResponse({'accepted': False, 'reason': 'Missing or invalid tags or difficulties in request'}, status=400)

        query_set = QuestionUserData.objects

        if tags:
            query_set = QuestionUserData.objects.filter(question__category__tags__text__in=tags)
        if difficulties:
            query_set = QuestionUserData.objects.filter(question__category__difficulty__in=difficulties)

        stats = get_stats_student(student, query_set=query_set)
        return JsonResponse({'accepted': True, 'stats': stats})

    return HttpResponse(status=400)

@login_required
def submit_demographics_form(request):
    if request.method != 'POST':
        return HttpResponse(status=405)
    
    student = request.user.student
    if student:
        if not student.completed_survey:
            required_fields = ['birth_year', 'gender', 'job', 'education_level', 'country', 'state', 'years_of_experience', 'organization']
            optional_fields = ["med_cardio_refresher", "med_cardio_date", "obgyn_refresher", "obgyn_date", "trauma_refresher", "trauma_date",
                               "pediatrics_refresher", "pediatrics_date", "pediatrics_refresher", "pediatrics_date", "leadership_refresher",
                               "leadership_date", "most_used_device", "internet_reliability", "work_device_hours", "personal_device_hours"]

            for field in required_fields:
                if field not in request.POST:
                    return HttpResponse(400)
                setattr(student, field, request.POST[field])
            
            student.completed_survey = True
            
            if student.organization == 'GVK':
                gvk_fields = {field:request.Post[field] for field in optional_fields}
                extra_info = GVK_EMRI_Demographics(student=student, **gvk_fields)
                extra_info.save()
                
            student.save()
            
        return HttpResponse(200)
    else:
        return HttpResponse(status=403)


# TODO: add better error reporting, statuses
@user_passes_test(is_admin)
def upload_questions(request):
    if request.method == 'POST' and 'file' in request.FILES:
        question_file = ContentFile(request.FILES['file'].read().decode('utf-8'))
        LoadFromCSV(question_file)
    return redirect('dashboard')

@user_passes_test(is_admin)
def upload_categories(request):
    if request.method == 'POST' and 'file' in request.FILES:
        category_file = ContentFile(request.FILES['file'].read().decode('utf-8'))
        LoadCategoryFromCSV(category_file)
    return redirect('dashboard')

@login_required
def submit_feedback(request):
    if request.method == 'POST':
        text = request.POST.get('feedback', False)
        question_text = request.POST.get('question', False)
        question = QuestionUserData.objects.get(student=request.user.student, question__text=question_text)
        feedback = Feedback(text=text, time=timezone.now())
        feedback.save()
        question.feedback = feedback
        question.save()
        return JsonResponse({'accepted': True})
    return JsonResponse({'accepted': False})
