from .models import Question, Quiz, Student, QuestionUserData, Answer, Tag
from .models import QuestionMedia, QuizUserData, Feedback, Category, Badge, Event, EventType
from .utils import get_stats_student

import logging
import os

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
            Badge.objects.create(name = badge, description = BADGE_DICT[badge], image = os.path.join("badges", f"{badge}.png"))

    # student_stat = get_stats_student(student, QuestionUserData.objects.filter(quiz_userdata__quiz__is_challenge=True))
    student_stat = get_stats_student(student)

    quizzes_done = student_stat['num_completed']
    badges_to_add = []
    if quizzes_done >= 1:
        badges_to_add.append(Badge.objects.get(name = '1Practice'))
        badges_to_add.append(Badge.objects.get(name = '1Weekly'))
    if quizzes_done >= 5:
        badges_to_add.append(Badge.objects.get(name = '5Weekly'))
    if quizzes_done >= 10:
        badges_to_add.append(Badge.objects.get(name = '10Weekly'))

    # TODO: fix with courses
    # if student.num_required_quizzes == 0:
    #     badges_to_add.append(Badge.objects.get(name = 'Pretest'))

    for badge in badges_to_add:
        if student not in badge.students.all():
            Event.objects.create(student=student, event_type=EventType.BadgeEarn.value, badge=badge)
            badge.students.add(student)
