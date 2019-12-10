from quiz.models import Quiz, QuestionUserData
from django.db.models import Count, F, Q, Value, CharField
import json

def run(*args):
    if len(args) < 2:
        # Difficulty -> [Basic, Intermediate, Expert]
        print("Usage: filter_difficulty --script-args [difficulty]")
        return

    difficulty = ' '.join(args)

    qud_total = QuestionUserData.objects.filter(question__difficulty=difficulty) \
                                          .values(name=F('student__name')) \
                                          .distinct() \
    
    qud_correct = qud_total.filter(question__answer__is_correct=True)

    count_total = qud_total.count()
    count_correct = qud_correct.count()

    print("FOR DIFFICULTY: " + difficulty)
    print("count_correct: ", count_correct)
    print("count_total: ", count_total)
    print("count_correct / count_total: ", count_correct / count_total)