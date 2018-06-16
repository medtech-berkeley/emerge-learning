from .models import Student, Question, Category, Answer, QuestionUserData


def get_stats_student(student):
    stats = {}
    qud = QuestionUserData.objects.filter(student=student)
    stats['questions_answered'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['questions_answered'] - stats['num_correct']
    return stats


def get_stats_question_total(question):
    stats = {}
    qud = QuestionUserData.objects.filter(question=question)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats


def get_stats_category(category):
    stats = {}
    qud = QuestionUserData.objects.filter(question__category=category)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats


def get_stats_location_total(location):
    stats = {}
    qud = QuestionUserData.objects.filter(student__location=location)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats


def get_stats_location_category(category, location):
    stats = {}
    qud = QuestionUserData.objects.filter(question__category=category, location=location)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats


def get_stats_question_location(question, location):
    stats = {}
    qud = QuestionUserData.objects.filter(question=question, location=location)
    stats['total_attempts'] = qud.count()
    stats['num_correct'] = qud.filter(answer__is_correct=True).count()
    stats['num_incorrect'] = stats['total_attempts'] - stats['num_correct']
    return stats
