from rest_framework import serializers
from .models import Question, QuestionUserData, Category, Answer, Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('user', 'name', 'location')


class QuestionUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionUserData
        fields = ('student', 'question', 'answer', 'time_started', 'is_done')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'start', 'end', 'sponsor', 'is_challenge')


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'text', 'is_correct')


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'category', 'text', 'answers', 'created', 'max_time')
