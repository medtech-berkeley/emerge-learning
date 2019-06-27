from quiz.models import Quiz, QuestionUserData
from django.db.models import Count, F, Q, Value, CharField

def run(*args):
    if len(args) < 2:
        print("Usage: get_leaders --script-args [quizname] [n_performers]")
        return

    quiz = Quiz.objects.filter(name=args[0])

    if quiz.exists():
        quiz = quiz.first()
        print("No quiz found with that name")
        return

    quiz_uds = QuestionUserData.objects.values(name=F('student__name'), 
                                                email=F('student__user__email')) \
                                        .filter(answer__is_correct=True) \
                                        .filter(quiz_userdata__quiz=quiz) \
                                        .annotate(score=Count('student__name')) \
                                        .order_by('-score')[int(args[1]):]
    
    return list(quiz_uds)
