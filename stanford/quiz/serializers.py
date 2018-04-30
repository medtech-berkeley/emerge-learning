from rest_framework import serializers
from .models import Question, QuestionUserData, Category, Answer, Student
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ('user', 'name', 'location', 'description', 'image')


class QuestionUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionUserData
        fields = ('student', 'question', 'answer', 'time_started', 'time_completed')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'start', 'end', 'sponsor', 'is_challenge')


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'text', 'is_correct')


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'category', 'text', 'answers', 'created', 'max_time')
