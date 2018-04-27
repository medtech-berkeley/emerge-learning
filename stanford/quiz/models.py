from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Student(models.Model):
    user = models.OneToOneField(User, related_name="student", on_delete=models.CASCADE)
    location = models.CharField(max_length=100)


class Category(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    sponsor = models.CharField(max_length=50)
    is_challenge = models.BooleanField()
    image = models.ImageField(upload_to="category_images", default='default.jpg')

    def __str__(self):
        return self.name


class Question(models.Model):
    text = models.CharField(max_length=300)
    category = models.ForeignKey(Category, related_name="questions", on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now)
    max_time = models.DurationField()

    def __str__(self):
        return self.category.name + " - Question " + str(self.id)


class Answer(models.Model):
    text = models.CharField(max_length=300)
    is_correct = models.BooleanField()
    question = models.ForeignKey(Question, related_name="answers", on_delete=models.CASCADE)

    def __str__(self):
        return "Question " + str(self.question.id) + " - Answer"


class QuestionUserData(models.Model):
    """
    Stores student-specific metadata for each question. Time it took to complete, what the student answered, etc
    """

    student = models.ForeignKey(Student, related_name="question_data", on_delete=models.DO_NOTHING)
    question = models.ForeignKey(Question, related_name="question_data", on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, null=True, related_name="question_data", on_delete=models.CASCADE)
    time_started = models.DateTimeField(default=timezone.now)
    time_completed = models.DateTimeField(null=True)

    def __str__(self):
        return "Question " + str(self.question.id) + " Data - " + self.student.user.username

    class Meta:
        unique_together = ('question', 'student')

