from quiz.models import Quiz, QuestionUserData
from django.db.models import Count, F, Q, Value, CharField
import json

def run(*args):
    qud_total = QuestionUserData.objects.filter(question__media=None)
    qud_correct = qud_total.filter(answer__is_correct=True)

    count_total = qud_total.count()
    count_correct = qud_correct.count()

    print("Without media: ")
    print("Number Correct: ", count_correct)
    print("Total Responses: ", count_total)
    print("Percentage Correct: ", count_correct / count_total)

    print()

    qud_total = QuestionUserData.objects.filter(~Q(question__media=None))
    qud_correct = qud_total.filter(answer__is_correct=True)

    count_total = qud_total.count()
    count_correct = qud_correct.count()

    print("With media: ")
    print("Number Correct: ", count_correct)
    print("Total Responses: ", count_total)
    print("Percentage Correct: ", count_correct / count_total)