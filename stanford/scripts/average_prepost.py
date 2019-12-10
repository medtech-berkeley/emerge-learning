from quiz.models import Quiz, QuestionUserData, Student
from django.db.models import Count, F, Q, Value, CharField
import json
import statistics

PRETEST_NAME = "Pretest (Required)"
POST_TEST_NAME = "Post Test (Required)"
TEST_LEN = 30

def get_takers(quiz_name):
    return Student.objects.filter(quiz_data__quiz__name=quiz_name).distinct()

def get_performace(student, quiz_name):
    qud_total = QuestionUserData.objects.filter(quiz_userdata__student=student, quiz_userdata__quiz__name=quiz_name)
    return qud_total.filter(answer__is_correct=True).count()

def run(*args):
    students = get_takers(PRETEST_NAME).intersection(get_takers(POST_TEST_NAME))
    percent_increase = []
    raw_increase = []

    for student in students:
        post_score = get_performace(student, POST_TEST_NAME)
        pre_score = get_performace(student, PRETEST_NAME)
        if (pre_score > 0):
            percent_increase.append((post_score - pre_score) / pre_score * 100)
        raw_increase.append(post_score - pre_score)

    print("Percent Increase:")
    print("MIN: ", min(percent_increase))
    print("MAX: ", max(percent_increase))
    print("MEAN: ", sum(percent_increase) / len(percent_increase))
    print("STD DEV: ", statistics.stdev(percent_increase))

    print()

    print("Score Increase:")
    print("MIN: ", min(raw_increase) / TEST_LEN)
    print("MAX: ", max(raw_increase) / TEST_LEN)
    print("MEAN: ", sum(raw_increase) / len(raw_increase) / TEST_LEN)
    print("STD DEV: ", statistics.stdev(raw_increase) / TEST_LEN)
