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

    qud_total = QuestionUserData.objects.filter(quiz_userdata__quiz=quiz) \
                                          .values(name=F('student__name')) \
                                          .distinct() \
    
    qud_correct = qud_total.filter(question__answer__is_correct=True)

    count_total = qud_total.count()
    count_correct = qud_correct.count()

    print("FOR QUIZ: " + name)
    print("count_correct: ", count_correct)
    print("count_total: ", count_total)
    print("count_correct / count_total: ", count_correct / count_total)