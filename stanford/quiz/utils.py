from .models import Student, Question, Category, Answer, QuestionUserData
from django.utils import timezone


def get_stats_student(student, date=None):
    if date is None:
        date = timezone.now()
    stats = {}
    qud = QuestionUserData.objects.filter(student=student, time_completed__lte=date)
    stats['questions_answered'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['questions_answered'] - stats['num_correct']
    return stats


def get_stats_question_total(question, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(question=question, time_completed__lte=date)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats


def get_stats_category(category, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(question__category=category, time_completed__lte=date)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats


def get_stats_location_total(location, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(student__location=location, time_completed__lte=date)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats


def get_stats_location_category(category, location, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(question__category=category, location=location, time_completed__lte=date)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats


def get_stats_question_location(question, location, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(question=question, location=location, time_completed__lte=date)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats
