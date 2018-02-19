from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Question, QuestionUserData, Category, Student
from .serializers import QuestionSerializer, QuestionUserDataSerializer, CategorySerializer, AnswerSerializer
from .models import Student, Category, Question, Answer, QuestionUserData
from rest_framework.viewsets import ModelViewSet


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class QuestionUserDataViewSet(ModelViewSet):
    queryset = QuestionUserData.objects.all()
    serializer_class = QuestionUserDataSerializer


@login_required
def get_question(request):
    """
    Return random question from category that user hasn't done yet, create QuestionUserData model info
    :param request: GET request with category ID
    :return: JSONResponse of question
    """
    if request.method == 'GET':
        student = request.user.student
        if student:
            try:
                category = Category.objects.get(name=request.GET['category'])
            except (Category.DoesNotExist, KeyError):
                return JsonResponse({'accepted': False, 'reason': 'Missing or invalid category in request'}, status=400)

            # check for questions user has already started, exclude from final set
            user_data = QuestionUserData.objects.filter(student=student, question__category=category)
            started_questions = set(data.question for data in user_data)
            question_set = [question for question in Question.objects.filter(category=category)
                            if question not in started_questions]
            if len(question_set) == 0:
                return JsonResponse(data={'accepted': False, 'reason': 'No new questions available'})
            question = question_set[0]
            # create QuestionUserData as user has started to answer question
            question_data = QuestionUserData.objects.create(student=student, question=question)

            # strip out correctness indicators from answers
            question_json = QuestionSerializer(instance=question).data
            for answer in question_json['answers']:
                del answer['is_correct']

            return JsonResponse(data=question_json, status=200)
    else:
        return HttpResponse(status=405)


@login_required
def submit_answer(request):
    """
    Update QuestionUserData with time_completed, answer, etc. Check that question was completed in time allotted in
        Question model.
    Return JSON response in the following form:
    ```
        {
            question_id: [question_id],
            answer_id: [answer_id that user submitted],
            correct_answer: [list of correct answer_ids],
            reason: [text reason for correct answer
        }
    ```
    :param request: Post request with QuestionID and AnswerID
    :return: JSONResponse with above format
    """
    pass

# TODO: add Serializers for Questions, Categories, set up permissions
#  (instructors can view, edit questions from their organization, students can only view categories, num_completed, etc)
