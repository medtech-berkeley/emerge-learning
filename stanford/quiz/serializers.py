from rest_framework import serializers
from rest_framework.fields import SkipField

from django.contrib.auth.models import User
from django.utils import timezone

from .utils import get_stats_student
from .models import Question, QuestionUserData, Quiz, Event, DeviceData
from .models import QuizUserData, Answer, Student, QuestionMedia, Feedback, Badge
from .models import Course

from collections import OrderedDict


class NonNullSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        """
        Object instance -> Dict of primitive datatypes.
        """
        ret = OrderedDict()
        fields = [field for field in self.fields.values() if not field.write_only]

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue

            if attribute is not None:
                represenation = field.to_representation(attribute)
                if represenation is None:
                    # Do not seralize empty objects
                    continue
                if isinstance(represenation, list) and not represenation:
                   # Do not serialize empty lists
                   continue
                ret[field.field_name] = represenation

        return ret

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ('name', 'description', 'image')

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(allow_null=True)
    badges = BadgeSerializer(many=True)
    class Meta:
        model = Student
        fields = ('id', 'user', 'name', 'location', 'description', 'image',
                  'consent_prompt_required', 'consent','completed_demographic_survey', 'completed_covid19_survey', 'profile_type', 'badges')

class SmallStudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ('user', 'profile_type')


class QuizSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ('id', 'name', 'start', 'end', 'is_challenge', 'max_time', 'image', 'is_completed', 'can_retake', 'required', 'tags')

    def get_is_completed(self, instance):
        try:
            user = self.context['request'].user.student
            quiz_data = QuizUserData.objects.filter(student=user, quiz=instance).latest()
            return quiz_data.is_done()
        except QuizUserData.DoesNotExist:
            return False


class QuizUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizUserData
        fields = ('quiz', 'student', 'time_started', 'time_completed')


class StudentCourseSerializer(serializers.ModelSerializer):
    num_required_quizzes = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields = ('id', 'name', 'num_required_quizzes', 'priority')

    def get_num_required_quizzes(self, instance):
        student = self.context['request'].user.student
        return instance.num_required_left(student)


class InstructorCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'priority')

class AnswerSerializer(serializers.ModelSerializer):
    # TODO: Get rid of is_correct in serializer
    class Meta:
        model = Answer
        fields = ('id', 'text', 'is_correct', 'explanation')

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
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='text', allow_null=True)
    answers = AnswerSerializer(many=True)
    media = QuestionMediaSerializer()

    class Meta:
        model = Question
        fields = ('id', 'text', 'answers', 'created', 'media', 'tags', 'reference_name', 'reference_link')

class DeviceDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceData
        fields = ('device_type', 'device_family', 'browser_family', 'browser_version', 'os_family', 'os_version')

class EventSerializer(NonNullSerializer):
    quiz_ud = QuizUserDataSerializer()
    question_ud = QuestionUserDataSerializer()
    badge = BadgeSerializer()
    device_data = DeviceDataSerializer()
    class Meta:
        model = Event
        fields = ('event_type', 'time', 'student', 'quiz_ud', 'question_ud', 'badge', 'device_data')

class StudentStatsSerializer(serializers.Serializer):
    name = serializers.CharField()
    location = serializers.CharField()
    image = serializers.ImageField()
    questions_answered = serializers.IntegerField(read_only=True)
    num_correct = serializers.IntegerField(read_only=True)
    num_incorrect = serializers.IntegerField(read_only=True)
    subjects = serializers.DictField()
    performance = serializers.DictField()
    num_completed = serializers.IntegerField(read_only=True)

    @staticmethod
    def student_to_stat(student, date):
        stats = get_stats_student(student, date)
        stats['location'] = student.location
        stats['image'] = student.image
        return stats

class LeaderboardStatSerializer(serializers.Serializer):
    name = serializers.CharField()
    location = serializers.CharField()
    image = serializers.URLField()
    score = serializers.IntegerField(read_only=True)

class QuestionFeedbackSerializer(serializers.Serializer):
    question__text = serializers.CharField()
    question__id = serializers.IntegerField()
    count = serializers.IntegerField()
    question__feedback = serializers.ListField()
