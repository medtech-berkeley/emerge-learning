from .models import Question, Quiz, Student, QuestionUserData, Answer, Tag, QuestionMedia, QuizUserData, Feedback, Category, Badge
from .utils import get_stats_student

BADGE_DICT = {
    'pretest':'completed pretest',
    '1quiz':'completed one quiz',
    '5quiz':'completed five quiz',
    '10quiz':'completed ten quiz'
}

def grant_badges(student):
    for badge in BADGE_DICT:
        if not Badge.objects.filter(name = badge).exists():
            Badge.objects.create(name = badge, description = BADGE_DICT[badge])

    student_stat = get_stats_student(student)
    quizzes_done = student_stat['num_completed']
    if quizzes_done >= 1:
        Badge.objects.get(name = '1quiz').students.add(student)
    if quizzes_done >= 5:
        Badge.objects.get(name = '5quiz').students.add(student)
    if quizzes_done >= 10:
        Badge.objects.get(name = '10quiz').students.add(student)

    if student.num_required_quizzes == 0:
        Badge.objects.get(name = 'pretest').students.add(student)
