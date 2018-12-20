from rest_framework import serializers
from .models import Question, QuestionUserData, Category, CategoryUserData, Answer, Student, QuestionMedia
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

class SmallStudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ('user',)

class CategorySerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='text', allow_null=True)
    class Meta:
        model = Category
        fields = ('id', 'name', 'start', 'end', 'sponsor', 'is_challenge', 'max_time', 'image', 'tags')


class CategoryUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryUserData
        fields = ('category', 'student', 'time_started', 'time_completed')


class AnswerSerializer(serializers.ModelSerializer):
    # TODO: Get rid of is_correct in serializer
    class Meta:
        model = Answer
        fields = ('id', 'text', 'is_correct')

class SecureAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('is_correct',)

class QuestionUserDataSerializer(serializers.ModelSerializer):
    student = SmallStudentSerializer()
    answer = SecureAnswerSerializer()
    class Meta:
        model = QuestionUserData
        fields = ('student', 'question', 'answer', 'time_started', 'time_completed', 'feedback')

class QuestionMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionMedia
        fields = ('media_file', 'media_type')

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    media = QuestionMediaSerializer()

    class Meta:
        model = Question
        fields = ('id', 'category', 'text', 'answers', 'created', 'media',)


class StudentStatsSerializer(serializers.Serializer):
    name = serializers.CharField()
    location = serializers.CharField()
    image = serializers.ImageField()
    questions_answered = serializers.IntegerField(read_only=True)
    num_correct = serializers.IntegerField(read_only=True)
    num_incorrect = serializers.IntegerField(read_only=True)
    subjects = serializers.DictField()
    performance = serializers.DictField()

class FeedbackSerializer(serializers.Serializer):
    question = QuestionSerializer()
    count = serializers.IntegerField()