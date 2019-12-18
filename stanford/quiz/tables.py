import django_tables2 as tables

from .models import Question, QuestionUserData, Quiz, Student, Feedback, Answer
from .models import Event, EventType
from .models import Student, Quiz, Question, Answer, QuestionUserData, QuizUserData, GVK_EMRI_Demographics

class StudentTable(tables.Table):
    class Meta:
        model = Student
        exclude = ['image']

class QuestionTable(tables.Table):
    tags = tables.Column(accessor='tags')

    class Meta:
        model = Question

    def render_tags(self, record):
        return ','.join(map(str, record.tags.all()))

class QuizTable(tables.Table):
    tags = tables.Column(accessor='tags')

    class Meta:
        model = Quiz

    def render_tags(self, record):
        return ','.join(map(str, record.tags.all()))

class AnswerTable(tables.Table):
    class Meta:
        model = Answer

    def render_question(self, value):
        return value.id

class QuestionUserDataTable(tables.Table):
    correct = tables.Column(accessor='answer.is_correct')
    class Meta:
        model = QuestionUserData

    def render_quiz_userdata(self, value):
        return value.id

    def render_question(self, value):
        return value.id

    def render_answer(self, value):
        return value.id

    def render_student(self, value):
        return value.id

    def render_feedback(self, value):
        return value.text

class QuizUserDataTable(tables.Table):
    class Meta:
        model = QuizUserData

    def render_quiz(self, value):
        return value.id

    def render_student(self, value):
        return value.id

class EventTable(tables.Table):
    class Meta:
        model = Event
    
    def render_quiz_ud(self, value):
        return value.id

    def render_question_ud(self, value):
        return value.id

    def render_student(self, value):
        return value.id

class DemographicsTable(tables.Table):
    class Meta:
        model = GVK_EMRI_Demographics
