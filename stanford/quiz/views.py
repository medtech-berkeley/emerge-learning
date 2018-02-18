from django.shortcuts import render
from django.contrib.auth.models import User
from .serializers import QuestionSerializer, QuestionUserDataSerializer, CategorySerializer, AnswerSerializer
from .models import Student, Instructor, Category, Question, Answer, QuestionUserData
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
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

def get_question(request):
    """
    Return random question from category that user hasn't done yet, create QuestionUserData model info
    :param request: GET request with category ID
    :return: JSONResponse of question
    """
    pass


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
