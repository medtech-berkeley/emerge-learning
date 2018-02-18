from rest_framework import serializers
from .models import Question, QuestionUserData, Category, Answer, Student, Instructor


# TODO: fill out, make AnswerSerializer a nested field for question
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('user', 'location')

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ('user', 'organization')



class QuestionUserDataSerializer(serializers.ModelSerializer):
    class Meta:
    	model = QuestionUserData
    	fields = ('student', 'question', 'answer', 'time_started', 'is_done')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
    	model = Category
    	fields = ('name', 'start', 'end', 'sponsor', 'is_challenge')

class QuestionSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Question
        fields = ('text', 'category', 'created', 'max_time')        


class AnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()
    class Meta:
    	model = Answer
    	fields = ('text', 'is_correct', 'question')

