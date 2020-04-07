from .models import Student, Question, Quiz, Answer, QuestionUserData, QuizUserData, Tag, Event, EventType

from django.utils import timezone
from django.utils.timezone import datetime
from django.http import Http404
from django.shortcuts import _get_queryset
from dateutil.relativedelta import relativedelta
from calendar import monthrange
import logging

logger = logging.getLogger(__name__)

def get_latest_object_or_404(klass, *args, **kwargs):
    """
    Uses get().latest() to return object, or raises a Http404 exception if
    the object does not exist.

    klass may be a Model, Manager, or QuerySet object. All other passed
    arguments and keyword arguments are used in the get() query.

    Note: Like with get(), an MultipleObjectsReturned will be raised if more than one
    object is found.
    """
    queryset = _get_queryset(klass)
    try:
        return queryset.filter(*args, **kwargs).latest()
    except queryset.model.DoesNotExist:
        raise Http404('No %s matches the given query.' % queryset.model._meta.object_name)

def get_earliest_object_or_404(klass, *args, **kwargs):
    """
    Uses get().latest() to return object, or raises a Http404 exception if
    the object does not exist.

    klass may be a Model, Manager, or QuerySet object. All other passed
    arguments and keyword arguments are used in the get() query.

    Note: Like with get(), an MultipleObjectsReturned will be raised if more than one
    object is found.
    """
    queryset = _get_queryset(klass)
    try:
        return queryset.filter(*args, **kwargs).earliest()
    except queryset.model.DoesNotExist:
        raise Http404('No %s matches the given query.' % queryset.model._meta.object_name)


def get_stats_student(student, date=None, query_set=QuestionUserData.objects.all()):
    stats = {}
    stats['name'] = student.name
    stats['practice_subjects'] = get_subject_stats(student, date, query_set=query_set.filter(quiz_userdata__quiz__is_challenge=False))
    stats['quiz_subjects'] = get_subject_stats(student, date, query_set=query_set.filter(quiz_userdata__quiz__is_challenge=True))

    if date is None:
        date = timezone.now()
    qud = query_set.filter(student=student, time_completed__lte=date)
    stats['questions_answered'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['questions_answered'] - stats['num_correct']
    stats['performance'] = get_performance_stats(student, date)
    stats['performance_breakdown'] = get_performance_breakdown(student, date)
    stats['score'] = stats['num_correct']
    studentQuiz = [quiz.is_done() for quiz in QuizUserData.objects.filter(student = student).all()]
    stats['num_completed'] = sum(studentQuiz)

    return stats

def get_performance_stat_for_date(student, date_range):
    start, stop = date_range
    qud = QuestionUserData.objects.filter(student=student, time_completed__gt=start, time_completed__lte=stop)
    return {'num_attempted' : qud.count(),
            'num_correct' : qud.filter(answer__is_correct=True).count()}

def get_performance_stats(student, date=None):
    if date is None:
        date = timezone.now()
        #"2018-11-01T20:29:13.109657Z"
    clean_date = date.replace(hour=0, minute=0, second=0)

    def get_month(month):
        _, last_day = monthrange(date.year, month)
        return clean_date.replace(day=1), clean_date.replace(month=month, day=last_day)

    performance_config = {
        "this_month": get_month(date.month),
        "last_month": get_month(datetime.now().month - 1 or 12),
        "week": (clean_date - timezone.timedelta(days=date.weekday()), date),
        "day": (clean_date, date),
        "all_time": (clean_date.replace(year=2000), date)
    }

    return {key: get_performance_stat_for_date(student, date_range) for key, date_range in performance_config.items()}

def get_performance_breakdown(student, date=None, num_days=7):
    if date is None:
        date = timezone.now()
    date = date.replace(hour=23, minute=59, second=59)

    start = date.replace(year=2000)

    breakdown = []
    for i in range(num_days):
        stop = date - timezone.timedelta(days=i)
        day_perf = get_performance_stat_for_date(student, (start, stop))
        breakdown.append({"day": datetime.strftime(stop, "%m/%d"), "points": day_perf['num_correct']})
    return reversed(breakdown)

def get_subject_stats(student, date=None, query_set=QuestionUserData.objects.all()):
    subject_stats = []
    if date is None:
        date = timezone.now()

    subjects = []
    for tag in Tag.objects.all():
        qud = query_set.filter(student=student, time_completed__lte=date, quiz_userdata__quiz__tags=tag.text)
        total = qud.count()
        if total > 0:
            name = tag.text.replace("practice", "").replace("-", " ").title()
            subjects.append({"name": name,
                             "Accuracy": get_subject_stat(student, tag.text, query_set, date)['percent_correct']
                            })

    return sorted(subjects, key=lambda subject: -subject["Accuracy"])

def get_subject_stat(student, subject, query_set=QuestionUserData.objects.all(), date=None):
    if date is None:
        date = timezone.now()

    qud = query_set.filter(student=student, time_completed__lte=date, quiz_userdata__quiz__tags=subject)

    stat = {}
    total = qud.count()
    if total == 0:
        stat['percent_correct'] = 0.0
    else:
        stat['percent_correct'] = qud.filter(answer__is_correct=True).count() / total

    return stat


def get_stats_question_total(question, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(question=question, time_completed__lte=date)
    stats['num_attempted'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['num_attempted'] - stats['num_correct']
    return stats


def get_stats_quiz(quiz, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(quiz_userdata__quiz=quiz, time_completed__lte=date)
    stats['num_attempted'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['num_attempted'] - stats['num_correct']
    return stats


def get_stats_location_total(location, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(student__location=location, time_completed__lte=date)
    stats['num_attempted'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['num_attempted'] - stats['num_correct']
    return stats


def get_stats_location_quiz(quiz, location, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(quiz=quiz, location=location, time_completed__lte=date)
    stats['num_attempted'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['num_attempted'] - stats['num_correct']
    return stats


def get_stats_location_question(question, location, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(question=question, location=location, time_completed__lte=date)
    stats['num_attempted'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['num_attempted'] - stats['num_correct']
    return stats


def get_student_quiz_stats(quiz_data, student):
    stats = {}
    qud = QuestionUserData.objects.filter(quiz_userdata=quiz_data, student=student)
    stats['num_attempted'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['num_attempted'] - stats['num_correct']
    return stats


def end_quiz(quiz_userdata: QuizUserData):
    student, quiz = quiz_userdata.student, quiz_userdata.quiz

    question_set = quiz_userdata.get_unanswered_questions()
    n_answered = len(quiz_userdata.get_answered_questions())

    for question in question_set:
        if n_answered < quiz.num_questions:
            qud = QuestionUserData.objects.filter(student=student,
                                                  question=question,
                                                  quiz_userdata=quiz_userdata)

            # if qud.exists():
            #     qud = qud.first()
            #     qud.time_completed = timezone.now()
            #     qud.save()
            if not qud.exists():
                question_data = QuestionUserData.objects.create(student=student,
                                                                question=question,
                                                                quiz_userdata=quiz_userdata,
                                                                time_completed=timezone.now())
            n_answered += 1

    if quiz_userdata.time_completed is None:
        quiz_userdata.time_completed = timezone.now()
        quiz_userdata.save()

    Event.objects.create(event_type=EventType.QuizEnd.value, student=student, quiz_ud=quiz_userdata)
    grant_badges(student)

def get_all_weekly_tags():
    return [f'week-{i + 1}' for i in range(12)]

def get_current_week_tag():
    try:
        return Quiz.objects.filter(tags__in=get_all_weekly_tags(),
                                    start__lte=timezone.now()) \
                            .order_by('-start').first().tags.first().text
    except:
        return ''

def get_previous_week_tag():
    try:
        return Quiz.objects.filter(tags__in=get_all_weekly_tags(),
                            start__lte=timezone.now()) \
                            .order_by('-start').all()[1].tags.first().text
    except:
        return ''


from .badges import grant_badges
