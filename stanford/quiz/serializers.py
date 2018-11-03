from rest_framework import serializers
from .models import Question, QuestionUserData, Category, Answer, Student, QuestionMedia
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ('user', 'name', 'location', 'description', 'image', 'completed_survey')


class QuestionUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionUserData


class CategorySerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='text', allow_null=True)
    class Meta:
        model = Category
        fields = ('name', 'start', 'end', 'sponsor', 'is_challenge', 'image', 'tags')


class AnswerSerializer(serializers.ModelSerializer):
    # TODO: Get rid of is_correct in serializer
    class Meta:
        model = Answer
        fields = ('id', 'text', 'is_correct')


class QuestionMediaSerialzier(serializers.ModelSerializer):
    class Meta:
        model = QuestionMedia
        fields = ('media_file', 'media_type')

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    media = QuestionMediaSerialzier()

    class Meta:
        model = Question
        fields = ('id', 'category', 'text', 'answers', 'created', 'media')


class StudentStatsSerializer(serializers.Serializer):
    name = serializers.CharField()
    subjects = serializers.DictField()
    questions_answered = serializers.IntegerField()
    num_correct = serializers.IntegerField()
    num_incorrect = serializers.IntegerField()
