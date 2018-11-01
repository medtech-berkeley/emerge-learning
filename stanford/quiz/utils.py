from .models import Student, Question, Category, Answer, QuestionUserData
from django.utils import timezone


def get_stats_student(student, date=None, query_set=QuestionUserData.objects):
    if date is None:
        date = timezone.now()

    stats = {}
    qud = query_set.filter(student=student, time_completed__lte=date)

    stats['name'] = student.name
    stats['questions_answered'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['questions_answered'] - stats['num_correct']
    stats['performance'] = get_stats_performance(student, date)
    return stats

def get_stats_performance(student, date=None):
    if date is None:
        date = timezone.now()
        #"2018-11-01T20:29:13.109657Z"

    performance_stats = {}

    for i in range(7):
        new_date = date - timezone.timedelta(days=i)
        qud = QuestionUserData.objects.filter(student=student, time_completed__date=new_date)

        day_label = "day" + str(i)

        performance_stats[day_label] = {'date' : new_date.date(),
                                        'num_attempted' : qud.count(),
                                        'num_correct' : qud.filter(answer__is_correct=True).count()}

    return performance_stats



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