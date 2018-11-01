from .models import Student, Question, Category, Answer, QuestionUserData
from django.utils import timezone


def get_stats_student(student, date=None, query_set=QuestionUserData.objects):
    stats = {}
    stats['name'] = student.name
    stats['subjects'] = get_subject_stats(student, date, query_set=query_set)
    stats['questions_answered'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['questions_answered'] - stats['num_correct']
    return stats

def get_subject_stats(student, date=None, query_set=QuestionUserData.objects):
    subject_stats = {}
    subjects = ['Circulation', 'Airway', 'Basic Procedures', 'EMS Knowledge']

    for subject in subjects:
        subject_stats[subject.replace(" ", "").lower()] = get_subject_stat(student, query_set, subject, date)

    return subject_stats

def get_subject_stat(student, query_set, subject, date=None):
    if date is None:
        date = timezone.now()
    qud = query_set.filter(student=student, time_completed__lte=date, question__category__tag__contains=subject)

    stat = {}
    total = qud.count()
    if total == 0:
        stat['percent_correct'] = '0'
    else:
        stat['percent_correct'] = str(int(qud.filter(answer__is_correct=True).count() * 100 / total))

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


def get_stats_category(category, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(question__category=category, time_completed__lte=date)
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


def get_stats_location_category(category, location, date=None):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = QuestionUserData.objects.filter(question__category=category, location=location, time_completed__lte=date)
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


def get_student_category_stats(category, student):
    stats = {}
    qud = QuestionUserData.objects.filter(question__category=category, student=student)
    stats['num_attempted'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['num_attempted'] - stats['num_correct']
    return stats


def get_unanswered_questions(student, category):
    user_data = QuestionUserData.objects.filter(student=student, question__category=category)
    started_questions = set(data.question for data in user_data)
    question_set = [question for question in Question.objects.filter(category=category)
                    if question not in started_questions]
    return question_set