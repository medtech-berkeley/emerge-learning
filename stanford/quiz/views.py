import pytz
import random
import datetime
import logging

from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.shortcuts import redirect, render
from django.template.loader import render_to_string
from django.db.models import Count, F, Q, Value, CharField
from django.db.models.functions import Concat
from django.core.files.base import File, ContentFile
from django.contrib.auth.models import User
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import user_passes_test
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django_rq import job

from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response
from rest_framework import permissions, generics, mixins

from .utils import get_student_quiz_stats, get_latest_object_or_404
from .utils import get_stats_student, end_quiz
from .utils import get_all_weekly_tags, get_current_week_tag, get_previous_week_tag
from .models import Question, QuestionUserData, Quiz, Student, Feedback
from .models import Event, EventType, Course, COVID19_Demographics
from .models import Student, Quiz, Question, Answer, QuestionUserData, QuizUserData, GVK_EMRI_Demographics
from .serializers import QuestionSerializer, QuestionUserDataSerializer, QuizSerializer
from .serializers import AnswerSerializer, LeaderboardStatSerializer, StudentSerializer
from .serializers import UserSerializer, StudentStatsSerializer, QuizUserDataSerializer, QuestionFeedbackSerializer
from .serializers import EventSerializer, StudentCourseSerializer, InstructorCourseSerializer
from .sheetreader import LoadFromCSV, LoadQuizFromCSV

from twilio.rest import Client


logging.basicConfig(format='%(asctime)s %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

def is_instructor(user):
    return user.is_authenticated and (user.student.profile_type in ['ADMN', 'INST'] or user.is_superuser)

def is_admin(user):
    return user.is_authenticated and (user.student.profile_type in 'ADMN' or user.is_superuser)

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return is_admin(request.user)

class IsInstructor(permissions.BasePermission):
    def has_permission(self, request, view):
        return is_instructor(request.user)


class StudentViewSet(ModelViewSet):
    model = Student
    serializer_class = StudentSerializer

    def get_queryset(self):
        user = self.request.user
        if is_instructor(user):
            return Student.objects.all()
        else:
            return Student.objects.filter(id=user.student.id)

    def get_object(self):
        if self.kwargs['pk'] == 'self':
            self.kwargs['pk'] = self.request.user.student.pk

        return super().get_object()


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsInstructor]


class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [IsInstructor]

class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsInstructor]


class QuizViewSet(ModelViewSet):
    serializer_class = QuizSerializer

    def get_queryset(self):
        course = self.request.query_params.get('course', None)
        if course is not None:
            course_quizzes = Quiz.objects.filter(course=course)
        else:
            course_quizzes = Quiz.objects.all()
        in_time = course_quizzes.filter(start__lte=timezone.now(), end__gte=timezone.now())
        quiz_uds = QuizUserData.objects.filter(student=self.request.user.student)
        completed = course_quizzes.filter(can_retake=False, id__in=quiz_uds.values('quiz_id'))

        return in_time | completed


class QuizUserDataViewSet(ModelViewSet):
    serializer_class = QuizUserDataSerializer
    lookup_field="quiz"

    def get_queryset(self):
        return QuizUserData.objects.filter(student=self.request.user.student)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_latest_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj


class StudentCourseViewSet(ModelViewSet):
    serializer_class = StudentCourseSerializer

    def get_queryset(self):
        return Course.objects.filter(is_active=True)


class InstructorCourseViewSet(ModelViewSet):
    serializer_class = InstructorCourseSerializer
    permission_classes = [IsInstructor]
    queryset = Course.objects.all()


class QuestionUserDataViewSet(ModelViewSet):
    serializer_class = QuestionUserDataSerializer

    def get_queryset(self):
        return QuestionUserData.objects.filter(student=self.request.user.student)


class StudentStatsViewSet(ViewSet):
    serializer_class = StudentStatsSerializer

    def sorted(self, student_stats):
        return student_stats

    def filtered(self, student_stats):
        return student_stats

    def get_queryset(self):
        user = self.request.user
        if is_instructor(user):
            return Student.objects.all()
        else:
            return Student.objects.filter(id=user.student.id)

    def get_date(self):
        date = self.request.GET.get('date', None)
        if date is not None:
            date = timezone.datetime.strptime(date, '%Y-%m-%d').astimezone(pytz.utc)
        return date

    def list(self, request):
        date = self.get_date()

        students_stats = []
        for student in self.get_queryset():
            students_stats.append(StudentStatsSerializer.student_to_stat(student, date))

        students_stats = self.filtered(self.sorted(students_stats))
        serializer = self.serializer_class(instance=students_stats, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        if pk == 'self':
            pk = request.user.student.pk

        date = self.get_date()
        student = get_object_or_404(self.get_queryset(), pk=pk)
        stat = StudentStatsSerializer.student_to_stat(student, date)

        serializer = self.serializer_class(instance=stat)
        return Response(serializer.data)


class LeaderboardStatViewSet(ViewSet):
    serializer_class = LeaderboardStatSerializer

    def get_date(self):
        date = self.request.GET.get('date', None)
        if date is not None:
            date = timezone.datetime.strptime(date, '%Y-%m-%d').astimezone(pytz.utc)
        return date

    def get_include_tags(self):
        return []

    def get_exclude_tags(self):
        return []

    def get_start_date(self):
        return timezone.datetime(1970, 1, 1, tzinfo=timezone.utc)

    def get_end_date(self):
        return timezone.now()

    def tag_filter(self, qud, course=None):
        include_tags = self.get_include_tags()
        if len(include_tags) > 0:
            qud = qud.filter(quiz_userdata__quiz__tags__in=include_tags)

        exclude_tags = self.get_exclude_tags()
        if len(exclude_tags) > 0:
            qud = qud.exclude(quiz_userdata__quiz__tags__in=exclude_tags)

        return qud

    def filter_qud(self, qud, course=None):
        return self.tag_filter(qud, course)

    def get_qud(self):
        qud = QuestionUserData.objects.filter(time_completed__gte=self.get_start_date(),
                                              time_completed__lte=self.get_end_date(),
                                              answer__is_correct=True)

        course = self.request.query_params.get('course', None)
        if course is not None:
            qud = qud.filter(quiz_userdata__quiz__course=course)

        return self.filter_qud(qud, course=course)

    def get_student_stats(self):
        qud = self.get_qud()
        return qud.values(name=F('student__name'), \
                            location=F('student__location'), \
                            sid=F('student__id'),
                            time=F('student__id'),
                            image=Concat(Value(settings.MEDIA_URL), F('student__image'))).annotate(score=Count('sid')) \
                    .order_by('-score')[:10]

    def list(self, request):
        student_stats = self.get_student_stats()

        serializer = self.serializer_class(instance=student_stats.all(), many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        if pk == 'self':
            pk = request.user.student.pk

        date = self.get_date()
        student = get_object_or_404(Student.objects.all(), pk=pk)
        stat = StudentStatsSerializer.student_to_stat(student, date)

        serializer = self.serializer_class(instance=stat)
        return Response(serializer.data)

class OverallPracticeLeaderboardStatViewSet(LeaderboardStatViewSet):
    def filter_qud(self, qud, course=None):
        return qud.filter(quiz_userdata__quiz__is_challenge=False)

class OverallQuizLeaderboardStatViewSet(LeaderboardStatViewSet):
    def filter_qud(self, qud, course=None):
        return qud.filter(quiz_userdata__quiz__is_challenge=True)

class CurrentWeeklyQuizLeaderboardStatViewSet(LeaderboardStatViewSet):
    def filter_qud(self, qud, course=None):
        challenges = Quiz.objects.filter(is_challenge=True, start__lte=timezone.now())

        if course != None:
            challenges = challenges.filter(course=course)

        current = challenges.order_by('-start').first()
        return qud.filter(quiz_userdata__quiz=current)

class PreviousWeeklyQuizLeaderboardStatViewSet(LeaderboardStatViewSet):
    def get_include_tags(self):
        return [get_previous_week_tag()]

class SpecificQuizLeaderboardStatViewSet(LeaderboardStatViewSet):
    tag = "week-1"
    def get_include_tags(self):
        return [self.tag]

class QuestionFeedbackViewSet(ViewSet):
    serializer_class = QuestionFeedbackSerializer
    permission_classes = [IsInstructor]

    def list(self, request):
        feedback = QuestionUserData.objects.exclude(feedback__isnull=True).values('question__text', 'question__id').annotate(count=Count("question")).order_by('-count')
        for q in feedback:
            q['question__feedback'] = []
            for i in QuestionUserData.objects.filter(question__id=q['question__id'], feedback__isnull=False):
                q['question__feedback'].append({'text': i.feedback.text, 'time': i.feedback.time, 'student': i.student.name})

        serializer = QuestionFeedbackSerializer(instance=feedback, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        return list(self, request)

@never_cache
@login_required
def start_quiz(request):
    """
    Starts a quiz for a user if the user hasn't taken it yet
    or is allowed to retake it, creates QuizUserData model info
    :param request: GET request with quiz ID
    :return: JSONResponse with accepted: True/Fale
    """
    if request.method == 'GET':
        student = request.user.student
        if student:
            try:
                quiz = Quiz.objects.get(id=int(request.GET['quiz']))
            except (Quiz.DoesNotExist, KeyError, ValueError):
                return JsonResponse({'accepted': False, 'reason': 'Missing or invalid quiz in request'}, status=400)

            quiz_data = student.quiz_data.filter(quiz=quiz)
            if quiz_data.exists():
                quiz_data = quiz_data.latest()

                if quiz.can_retake and quiz_data.is_done():
                    end_quiz(quiz_data)
                else:
                    return JsonResponse({'accepted': False, 'reason': 'This quiz has already been started'}, status=400)

            # check if there are any required quizzes left to do
            if not quiz.required:
                if  quiz.course.num_required_left(student) > 0:
                    return JsonResponse({'accepted': False, 'reason': 'Missing one or more required tests.'}, status=400)

            qud = QuizUserData.objects.create(student=student, quiz=quiz)
            Event.objects.create(event_type=EventType.QuizStart.value, student=student, quiz_ud=qud)
            return JsonResponse({'accepted': True}, status=200)

@never_cache
@login_required
def get_question(request):
    """
    Return arbitrary question from quiz that user hasn't done yet, create QuestionUserData model info
    :param request: GET request with quiz ID
    :return: JSONResponse of question
    """
    if request.method == 'GET':
        student = request.user.student
        if student:
            try:
                quiz = Quiz.objects.get(id=int(request.GET['quiz']))
            except (Quiz.DoesNotExist, KeyError, ValueError):
                return JsonResponse({'accepted': False, 'reason': 'Missing or invalid quiz in request'}, status=400)

            quiz_data = student.quiz_data.filter(quiz=quiz)

            if not quiz_data.exists():
                return JsonResponse({'accepted': False, 'reason': 'Must start a quiz before getting a question'}, status=400)

            quiz_data = quiz_data.latest()

            started_question = QuestionUserData.objects.filter(quiz_userdata=quiz_data, student=student, answer=None)

            outoftime = quiz_data.is_out_of_time()

            if not outoftime and started_question.exists():
                question = started_question.first().question
            else:
                # check for questions user has already started, exclude from final set
                question_set = quiz_data.get_unanswered_questions()

                if quiz_data.is_done():
                    end_quiz(quiz_data)

                    stats = get_student_quiz_stats(quiz_data, student)

                    response = {'accepted': True,
                                'completed': True,
                                'outoftime': outoftime,
                                'num_attempted': stats['num_attempted'],
                                'num_correct': stats['num_correct']}
                    return JsonResponse(data=response)

                question = random.choice(question_set)
                # create QuestionUserData as user has started to answer question
                question_data = QuestionUserData.objects.create(student=student, question=question, quiz_userdata=quiz_data)
                Event.objects.create(event_type=EventType.QuestionStart.value, student=student, question_ud=question_data)

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
                quiz_id = int(request.POST['quiz'])
                answer_id = request.POST['answer']
            except (Quiz.DoesNotExist, KeyError, ValueError):
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

            quiz_data = student.quiz_data.filter(quiz=quiz_id)
            if not quiz_data.exists():
                return JsonResponse({'accepted': False, 'reason': 'Quiz not started yet'}, status=404)

            quiz_data = quiz_data.latest()

            user_data = student.question_data.filter(question=question, quiz_userdata=quiz_data)

            if not user_data.exists():
                return JsonResponse({'accepted': False, 'reason': 'Question not started yet'}, status=404)
            user_data = user_data.first()


            if user_data.answer is None and not quiz_data.is_out_of_time():
                user_data.answer = answer
                user_data.time_completed = timezone.now()
                user_data.save()

                Event.objects.create(event_type=EventType.QuestionEnd.value, student=student, question_ud=user_data)

                if quiz_data.is_done():
                    end_quiz(quiz_data)

                return JsonResponse({'accepted': True, 'correct': answer.is_correct})
            elif quiz_data.is_out_of_time():
                return JsonResponse({'accepted': False, 'reason': 'Ran out of time'})
            else:
                return JsonResponse({'accepted': False, 'reason': 'Already answered'})
    else:
        return HttpResponse(status=405)


@login_required
def get_quiz_results(request):
    if request.method != 'GET':
        return HttpResponse(status=405)

    student = request.user.student
    if student:
        try:
            quiz = Quiz.objects.get(id=int(request.GET['quiz']))
        except (Quiz.DoesNotExist, KeyError, ValueError):
            return JsonResponse({'accepted': False, 'reason': 'Missing or invalid quiz in request'}, status=400)

        quiz_data = student.quiz_data.filter(quiz=quiz)

        if not quiz_data.exists():
            return JsonResponse({'accepted': False, 'reason': 'Quiz not started yet'}, status=404)

        quiz_data = quiz_data.latest()

        if not quiz_data.is_done():
            return JsonResponse({'accepted': False, 'reason': 'Quiz has not yet been completed'}, status=400)

        outoftime = quiz_data.is_out_of_time()

        # if 'pretest' in [tag.text for tag in quiz.tags.all()]:
        #     return JsonResponse({'accepted': True, 'results': [], 'outoftime': outoftime})

        result = []
        user_data = QuestionUserData.objects.filter(quiz_userdata=quiz_data, student=student)
        for qud in user_data:
            question = {
                'text': qud.question.text,
                'answers': [{"id": answer.id, "text": answer.text} for answer in qud.question.answers.all()],
                'correct': [answer.id for answer in qud.question.answers.filter(is_correct=True)],
                'selected': qud.answer.pk if qud.answer else None,
                'explanation': [answer.explanation for answer in qud.question.answers.filter(is_correct=True)][0],
                'reference_name': qud.question.reference_name,
                'reference_link': qud.question.reference_link
            }
            result.append(question)
        return JsonResponse({'accepted': True, 'results': result, 'outoftime': outoftime})

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
            return JsonResponse({'accepted': False, 'reason': 'Missing or invalid tags or difficulties in request'}, status=400)

        query_set = QuestionUserData.objects

        if tags:
            query_set = QuestionUserData.objects.filter(question__tags__text__in=tags)
        if difficulties:
            query_set = QuestionUserData.objects.filter(question__difficulty__in=difficulties)

        stats = get_stats_student(student, query_set=query_set)
        return JsonResponse({'accepted': True, 'stats': stats})

    return HttpResponse(status=400)

@login_required
def submit_consent_form(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    consent = request.POST['consent']

    student = request.user.student
    if student:
        student.consent = consent.lower() == "true"
        student.consent_prompt_required = False
        student.save()

        return HttpResponse(200)
    else:
        return HttpResponse(status=403)

@login_required
def submit_demographics_form(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    student = request.user.student
    if student:
        if not student.completed_demographic_survey:
            required_fields = ['birth_year', 'gender', 'job', 'education_level', 'country', 'state', 'years_of_experience', 'organization']
            optional_fields = ["med_cardio_refresher", "med_cardio_date", "obgyn_refresher", "obgyn_date", "trauma_refresher", "trauma_date",
                               "pediatrics_refresher", "pediatrics_date", "pediatrics_refresher", "pediatrics_date", "leadership_refresher",
                               "leadership_date", "most_used_device", "internet_reliability", "work_device_hours", "personal_device_hours"]

            for field in required_fields:
                if field not in request.POST:
                    return HttpResponse(status=400)
                setattr(student, field, request.POST[field])

            student.completed_demographic_survey = True

            # if student.organization == 'GVK':
            #     gvk_fields = {field:request.POST[field] for field in optional_fields}
            #     extra_info = GVK_EMRI_Demographics(student=student, **gvk_fields)
            #     extra_info.save()

            student.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=403)


@login_required
def submit_covid19_form(request):
    if request.method != 'POST':
        return HttpResponse(status=405)

    student = request.user.student
    if student:
        if not student.completed_covid19_survey:
            fields = ["register_reason", "confident_covid_care", "ppe_access", "game_related_work", "cared_for_covid", "cared_for_covid_possible"]
            boolean_fields = []

            student.completed_covid19_survey = True

            covid_fields = {field:request.POST[field] for field in fields}


            extra_info = COVID19_Demographics(student=student, **covid_fields)
            extra_info.save()

            student.save()

        return HttpResponse(status=200)
    else:
        return HttpResponse(status=403)


def get_students_scores_and_emails(tag):
    qud = QuestionUserData.objects.filter(answer__is_correct=True, quiz_userdata__quiz__tags=tag)
    return qud.values(name=F('student__name'),
                        location=F('student__location'),
                        email=F('student__user__email'),
                        image=Concat(Value(settings.MEDIA_URL), F('student__image'))) \
                .annotate(score=Count('student__name'))

@job
def send_weekly_email(subject, message, recipient, bcc_list, tag, last_tag):
    current_week = get_students_scores_and_emails(tag)
    last_week = get_students_scores_and_emails(last_tag)
    current_studs = {last['name']:last['score'] for last in current_week}
    last_week_studs = {last['name']:last['score'] for last in last_week}

    students = []
    for email in bcc_list:
        stud = Student.objects.filter(user__email=email)
        if not stud.exists():
            continue
        stud = stud.first()
        students.append({'email': email, 'name': stud.name, 'score': current_studs.get(stud.name, 0), 'last_score': last_week_studs.get(stud.name, 0)})

    leaderboard_info = SpecificQuizLeaderboardStatViewSet()
    leaderboard_info.tag = tag
    leaderboard_rows = [{**{'num': i + 1}, **stat} for i, stat in enumerate(leaderboard_info.get_student_stats())]
    for student in students:
        info = {
            'username': student['name'],
            'leaderboard_rows': leaderboard_rows,
            'current_accuracy': student['score'] * 10,
            'last_accuracy': student['last_score'] * 10,
            'body_text': message,
        }

        if student['email'] in bcc_list:
            html_message = render_to_string('weekly_update.html', info)
            send_email.delay(subject, html_message, student['email'])

# TODO: add better error reporting, statuses
@user_passes_test(is_admin)
def upload_questions(request):
    if request.method == 'POST' and 'file' in request.FILES:
        question_file = ContentFile(request.FILES['file'].read().decode('utf-8'))
        LoadFromCSV(question_file)
    return redirect('dashboard')

@user_passes_test(is_admin)
def upload_quizzes(request):
    if request.method == 'POST' and 'file' in request.FILES:
        quiz_file = ContentFile(request.FILES['file'].read().decode('utf-8'))
        LoadQuizFromCSV(quiz_file)
    return redirect('dashboard')

@user_passes_test(is_admin)
def send_email_view(request):
    mail_subject = request.POST['subject']
    recipient = request.POST['recipient']
    message = request.POST['message']

    if recipient.strip() == 'test@emergelearning.org'.strip():
        emails = ['sean@dooher.net', 'arjunsv@berkeley.edu', 'blindquist2@gmail.com']
    else:
        emails = User.objects.filter(student__subscribed_to_emails=True).values_list('email', flat=True)

    if request.POST.get('weekly', None):
        week = int(request.POST['week'])
        tag = f"week-{week}"
        last_tag = f"week-{week - 1}"
        send_weekly_email.delay(mail_subject, message, recipient, set(emails), tag, last_tag)
    else:
        message_with_footer = render_to_string('email_template.html', {'message': message})
        send_email.delay(mail_subject, message_with_footer, recipient, emails)

    return redirect('dashboard')

@job
def send_email(subject, message, recipient, bcc_list=[]):
    """ Sends email with message to recipient, bcc all emails in bcc (list).
    """
    txt_message = strip_tags(message)

    msg = EmailMultiAlternatives(subject, txt_message, to=[recipient], bcc=bcc_list)
    msg.attach_alternative(message, "text/html")
    msg.send()

def send_whatsapp_view(request):
    """ Sends whatsapp with message to recipient"""
    body = request.POST['message']
    to = request.POST['number']

    account_sid = 'AC55c5340cd976e45ed8374320ce025d83'
    auth_token = '3d9e1f6dbb2aebd3cf89d8702be59e31'
    client = Client(account_sid, auth_token)

    client.messages.create(
        from_ = 'whatsapp:+14155238886',
        body = body,
        to = f"whatsapp:+1{to}"
    )

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
