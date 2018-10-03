import datetime

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

from .model_constants import YEAR_CHOICES, GENDER_CHOICES, JOB_CHOICES, COUNTRY_CHOICES, ORG_CHOICES

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="Enter Name")
    location = models.CharField(max_length=100, default="Enter location")
    description = models.CharField(max_length=500, default="Enter description")
    
    completed_survey = models.BooleanField(default=False)
    image = models.ImageField(upload_to='profile_images', default="/static/accounts/default_profile.jpg", blank=True)
    birth_year = models.IntegerField(choices=YEAR_CHOICES, default=datetime.datetime.now().year)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='U')
    job = models.CharField(max_length=4, choices=JOB_CHOICES, default='OTH')
    education_level = models.CharField(max_length=3, default="LPS")
    country = models.CharField(max_length=2, choices=COUNTRY_CHOICES, default='AX')
    state = models.CharField(max_length=2, default="Denial")
    years_of_experience = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    organization = models.CharField(max_length=3, choices=ORG_CHOICES, default='OTH')

    
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

    NOVICE = 'Novice'
    INTERMEDIATE = 'Intermediate'
    ADVANCED = 'Advanced'
    DIFFICULTY_CHOICES = (
        (NOVICE, 'Novice'),
        (INTERMEDIATE, 'Intermediate'),
        (ADVANCED, 'Advanced'),
    )

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default=NOVICE,
    )

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

    student = models.ForeignKey(Student, related_name="question_data", on_delete=models.CASCADE)
    question = models.ForeignKey(Question, related_name="question_data", on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, null=True, related_name="question_data", on_delete=models.CASCADE)
    time_started = models.DateTimeField(default=timezone.now)
    time_completed = models.DateTimeField(null=True)

    def __str__(self):
        return "Question " + str(self.question.id) + " Data - " + self.student.user.username

    class Meta:
        unique_together = ('question', 'student')


class GVK_EMRI_Demographics(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    med_cardio_refresher = models.BooleanField()
    med_cardio_date = models.DateField(null=True)

    obgyn_refresher = models.BooleanField()
    obgyn_date = models.DateField(null=True)
    
    trauma_refresher = models.BooleanField()
    trauma_date = models.DateField(null=True)

    pediatrics_refresher = models.BooleanField()
    pediatrics_date = models.DateField(null=True)


    pediatrics_refresher = models.BooleanField()
    pediatrics_date = models.DateField(null=True)