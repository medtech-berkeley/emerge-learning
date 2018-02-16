from rest_framework import serializers
from .models import Question, QuestionUserData, Category, Answer


# TODO: fill out, make AnswerSerializer a nested field for question
class QuestionSerializer(serializers.ModelSerializer):
    pass


class UserDataSerializer(serializers.ModelSerializer):
    pass


class CategorySerializer(serializers.ModelSerializer):
    pass


class AnswerSerializer(serializers.ModelSerializer):
    pass
