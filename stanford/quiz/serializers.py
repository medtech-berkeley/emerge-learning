from rest_framework import serializers
from django.contrib.auth.models import User

from .utils import get_stats_student
from .models import Question, QuestionUserData, Category, CategoryUserData, Answer, Student, QuestionMedia, Feedback

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ('user', 'name', 'location', 'description', 'image', 'completed_survey', 'profile_type')

class SmallStudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ('user', 'profile_type')

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

class FeedbackSerializer(serializers.Serializer):
    class Meta:
        model = Feedback
        fields = ('id', 'text', 'time', 'student')

class QuestionUserDataSerializer(serializers.ModelSerializer):
    student = SmallStudentSerializer()
    answer = SecureAnswerSerializer()
    feedback = FeedbackSerializer()
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

    @staticmethod
    def student_to_stat(student, date):
        stats = get_stats_student(student, date)
        stats['location'] = student.location
        stats['image'] = student.image
        return stats


class LeaderboardStatSerializer(serializers.Serializer):
    name = serializers.CharField()
    location = serializers.CharField()
    image = serializers.ImageField()
    score = serializers.IntegerField(read_only=True)
    


class QuestionFeedbackSerializer(serializers.Serializer):
    question__text = serializers.CharField()
    question__id = serializers.IntegerField()
    count = serializers.IntegerField()
    question__feedback = serializers.ListField()