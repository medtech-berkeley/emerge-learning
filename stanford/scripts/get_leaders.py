from quiz.models import Quiz, QuestionUserData
from django.db.models import Count, F, Q, Value, CharField
import json

def run(*args):
    if len(args) < 2:
        print("Usage: get_leaders --script-args [quizname] [n_performers]")
        return
    name = ' '.join(args[:-1])
    quiz = Quiz.objects.filter(name=name)

    if not quiz.exists():
        print("No quiz found with that name")
        return
    
    quiz = quiz.first()

    quiz_uds = QuestionUserData.objects.filter(answer__is_correct=True) \
                                       .filter(quiz_userdata__quiz=quiz) \
                                       .values(name=F('student__name'), 
                                               email=F('student__user__email')) \
                                       .annotate(score=Count('student__name')) \
                                       .order_by('-score')[:int(args[-1])]
    
    print(json.dumps(list(quiz_uds.all())))
