from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import Question, QuestionUserData, Category, Student
from .serializers import QuestionSerializer, QuestionUserDataSerializer, CategorySerializer, AnswerSerializer, StudentSerializer, UserSerializer, DataSerializer
from .models import Student, Category, Question, Answer, QuestionUserData
from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from quiz.utils import get_stats_student


# TODO: set up permissions for viewsets

class StudentViewSet(ModelViewSet):
    model = Student
    serializer_class = StudentSerializer

    def get_queryset(self):
        user=self.request.user
        queryset = Student.objects.filter(user=user)
        return queryset

class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class QuestionUserDataViewSet(ModelViewSet):
    queryset = QuestionUserData.objects.all()
    serializer_class = QuestionUserDataSerializer


class StudentsStatsViewSet(ViewSet):
    serializer_class = DataSerializer

    def list(self, request):
        students_stats = []
        students = Student.objects.all()
        for student in students:
            stats = get_stats_student(student)
            students_stats.append(stats)
        
        serializer = DataSerializer(instance=students_stats, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        student_stats = []
        student = Student.objects.get(user=request.user)
        stats = get_stats_student(student)
        student_stats.append(stats)

        serializer = DataSerializer(instance=student_stats, many=True)
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
                category = Category.objects.get(name=request.GET['category'])
            except (Category.DoesNotExist, KeyError):
                return JsonResponse({'accepted': False, 'reason': 'Missing or invalid category in request'}, status=400)

            # check for questions user has already started, exclude from final set
            user_data = QuestionUserData.objects.filter(student=student, question__category=category)
            started_questions = set(data.question for data in user_data)
            question_set = [question for question in Question.objects.filter(category=category)
                            if question not in started_questions]
            if len(question_set) == 0:
                return JsonResponse(data={'accepted': True, 'completed': True})
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

            if not user_data.exists():
                return JsonResponse({'accepted': False, 'reason': 'Question not started yet'}, status=404)

            user_data = user_data.first()

            if user_data.answer is None and timezone.now() < user_data.time_started + question.max_time:
                user_data.answer = answer
                user_data.time_completed = timezone.now()
                user_data.save()

                return JsonResponse({'accepted': True, 'correct': answer.is_correct})
            elif timezone.now() >= user_data.time_started + question.max_time:
                return JsonResponse({'accepted': False, 'reason': 'Ran out of time'})
            else:
                return JsonResponse({'accepted': False, 'reason': 'Already answered'})
    else:
        return HttpResponse(status=405)
