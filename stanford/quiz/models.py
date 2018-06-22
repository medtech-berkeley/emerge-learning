from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="Enter Name")
    location = models.CharField(max_length=100, default="Enter location")
    description = models.CharField(max_length=500, default="Enter description")
    image = models.ImageField(upload_to='profile_images', blank=True)

    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            student = Student.objects.create(user=instance)
            student.save()

class Tag(models.Model):
    text = models.CharField(max_length=64, primary_key=True)

    def __str__(self):
        return self.text        

class Category(models.Model):
    name = models.CharField(max_length=100, primary_key=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    sponsor = models.CharField(max_length=50)
    is_challenge = models.BooleanField()
    image = models.ImageField(upload_to="category_images", default='default.jpg')
    tags = models.ManyToManyField(Tag, related_name="categories")

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
