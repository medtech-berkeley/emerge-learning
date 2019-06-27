from quiz.models import Quiz, QuestionUserData
from django.db.models import Count, F, Q, Value, CharField
import json

def run(*args):
    if len(args) < 2:
        print("Usage: num_takers --script-args [quizname]")
        return

    name = ' '.join(args)
    quiz = Quiz.objects.filter(name=name)

    if not quiz.exists():
        print("No quiz found with that name")
        return

    quiz = quiz.first()

    count = QuestionUserData.objects.filter(quiz_userdata__quiz=quiz) \
                                    .values(name=F('student__name')) \
                                    .distinct() \
                                    .count()

    print(count)
