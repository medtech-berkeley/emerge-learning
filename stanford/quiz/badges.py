from .models import Question, Quiz, Student, QuestionUserData, Answer, Tag, QuestionMedia, QuizUserData, Feedback, Category, Badge
from .utils import get_stats_student
import logging

BADGE_DICT = {
    'Pretest':'Complete Pretest',
    '1Practice': 'Complete One Practice Quiz',
    '1Weekly': 'Complete One Weekly Challenge',
    '5Weekly': 'Complete Five Weekly Challenges',
    '10Weekly': 'Complete Ten Weekly Challenges',
    '70%': 'Score Over 70% On A Weekly Challenge',

}

logger = logging.getLogger(__name__)

def grant_badges(student):
    for badge in BADGE_DICT:
        if not Badge.objects.filter(name = badge).exists():
            Badge.objects.create(name = badge, description = BADGE_DICT[badge], image = badge+'.png')

    # student_stat = get_stats_student(student, QuestionUserData.objects.filter(quiz_userdata__quiz__is_challenge=True))
    student_stat = get_stats_student(student)

    quizzes_done = student_stat['num_completed']
    if quizzes_done >= 1:
        Badge.objects.get(name = '1Practice').students.add(student)
        Badge.objects.get(name = '1Weekly').students.add(student)
    if quizzes_done >= 5:
        Badge.objects.get(name = '5Weekly').students.add(student)
    if quizzes_done >= 10:
        Badge.objects.get(name = '10Weekly').students.add(student)

    if student.num_required_quizzes == 0:
        Badge.objects.get(name = 'Pretest').students.add(student)
