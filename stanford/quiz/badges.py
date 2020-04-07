from .models import Question, Quiz, Student, QuestionUserData, Answer, Tag
from .models import QuestionMedia, QuizUserData, Feedback, Category, Badge, Event, EventType
from .utils import get_stats_student

from num2words import num2words

import logging
import os

BADGE_DICT = {
    'Pretest':'Complete Pretest',
    '70pChallenge': 'Score Over 70% on a Challenge',
    'PerfectChallenge': 'Get a Perfect Score On A Challenge',
    'LoginInThree': 'Log In to Emerge Learning Three Days in a Row!',
    'LoginInSeven': 'Log In to Emerge Learning Seven Days in a Row!'
}

practice_quiz_thresholds = [1, 10, 20, 30, 40, 50]
practice_question_thresholds = [10, 20, 30, 40, 50]

BADGE_DICT.update({f"{n}Practice":f"Complete {num2words(n).title()} Practice Quizzes" for n in practice_quiz_thresholds})
BADGE_DICT.update({f"{n}PracticeQC":f"Answer {num2words(n).title()} Practice Questions Correctly" for n in practice_question_thresholds})

challenge_quiz_thresholds = [1, 5, 10]
challenge_question_thresholds = [10, 15, 20]

BADGE_DICT.update({f"{n}Challenge":f"Complete {num2words(n).title()} Challenge Quizzes" for n in challenge_quiz_thresholds})
BADGE_DICT.update({f"{n}ChallengeQC":f"Answer {num2words(n).title()} Challenge Questions Correctly" for n in challenge_question_thresholds})

logger = logging.getLogger(__name__)

def get_threshold_badges(student, tag, quiz_thresh, question_thresh, is_challenge):
    badges = []
    qud = QuestionUserData.objects.filter(student=student, quiz_userdata__quiz__is_challenge=is_challenge)

    # num_answered = qud.count()
    num_correct = qud.filter(answer__is_correct=True).count()
    num_quizzes = QuizUserData.objects.filter(student=student, quiz__is_challenge=is_challenge).count()

    for threshold in quiz_thresh:
        if num_quizzes >= threshold:
            badges.append(Badge.objects.get(name=f'{threshold}{tag}'))

    for threshold in question_thresh:
        if num_correct >= threshold:
            badges.append(Badge.objects.get(name=f'{threshold}{tag}QC'))

    return badges

def get_challenge_badges(student):
    badges = get_threshold_badges(student, 'Challenge', challenge_quiz_thresholds, challenge_question_thresholds, True)
    return badges

def get_practice_badges(student):
    badges = get_threshold_badges(student, 'Practice', practice_quiz_thresholds, practice_question_thresholds, False)
    return badges

def get_pretest_badges(student):
    if QuizUserData.objects.filter(student=student, quiz__tags__in=["pretest"]).count() > 0:
        return [Badge.objects.get(name = 'Pretest')]
    return []

def grant_badges(student):
    for badge in BADGE_DICT:
        if not Badge.objects.filter(name = badge).exists():
            Badge.objects.create(name = badge, description = BADGE_DICT[badge], image = os.path.join("badges", f"{badge}.png"))

    badges_to_add = []

    badges_to_add.extend(get_practice_badges(student))
    badges_to_add.extend(get_challenge_badges(student))
    badges_to_add.extend(get_pretest_badges(student))


    for badge in badges_to_add:
        if student not in badge.students.all():
            Event.objects.create(student=student, event_type=EventType.BadgeEarn.value, badge=badge)
            badge.students.add(student)
