import datetime

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.db import transaction
from django.dispatch import receiver
from os import path

from .model_constants import YEAR_CHOICES, GENDER_CHOICES, JOB_CHOICES, COUNTRY_CHOICES, \
                             ORG_CHOICES, DEVICE_CHOICES, INTERNET_CHOICES, PROFILE_CHOICES

def on_transaction_commit(func):
    def inner(*args, **kwargs):
        transaction.on_commit(lambda: func(*args, **kwargs))
    return inner

class AddTagMixin:
    def add_tag(self, text):
        try:
            tag = Tag.objects.get(text=text)
        except Tag.DoesNotExist:
            tag = Tag.objects.create(text=text)
        self.tags.add(tag)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="Enter Name")
    location = models.CharField(max_length=100, default="Enter location")
    description = models.CharField(max_length=500, default="Enter description")

    consent_prompt_required = models.BooleanField(default=True)
    consent = models.BooleanField(default=False)
    completed_demographic_survey = models.BooleanField(default=False)

    image = models.ImageField(upload_to='profile_images', default="/static/accounts/default_profile.jpg", blank=True)
    birth_year = models.IntegerField(choices=YEAR_CHOICES, default=timezone.now().year)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='U')
    job = models.CharField(max_length=4, choices=JOB_CHOICES, default='OTH')
    education_level = models.CharField(max_length=3, default="LPS")
    country = models.CharField(max_length=2, choices=COUNTRY_CHOICES, default='AX')
    state = models.CharField(max_length=20, default="Denial")
    years_of_experience = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    organization = models.CharField(max_length=3, choices=ORG_CHOICES, default='OTH')

    profile_type = models.CharField(max_length=10, choices=PROFILE_CHOICES, default="STUD")

    @property
    def num_required_quizzes(self):
        completed_quizzes = set(q.quiz for q in QuizUserData.objects.filter(student=student) if q.is_done())
        required_quizzes = set(Quiz.objects.filter(required=True)) - completed_quizzes
        return len(required_quizzes)

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

class Quiz(models.Model, AddTagMixin):
    name = models.CharField(max_length=100)
    start = models.DateTimeField(default=timezone.now)
    end = models.DateTimeField(default=timezone.datetime(9999, 1, 1, tzinfo=timezone.utc))
    is_challenge = models.BooleanField(default=False)
    image = models.ImageField(upload_to="quiz_images", default='default.jpg')
    max_time = models.DurationField(default=datetime.timedelta(minutes=10))
    tags = models.ManyToManyField(Tag, related_name="quizzes")
    can_retake = models.BooleanField(default=False)
    num_questions = models.IntegerField(default=-1) # -1 indicates there is no limit
    required = models.BooleanField(default=False)

    @property
    def questions(self):
        return Question.objects.filter(tags__in=self.tags.all())

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=256, primary_key=True)
    practice_quiz = models.ForeignKey(Quiz, related_name="practice_category", on_delete=models.SET_NULL, null=True, blank=True)

    @receiver(post_save, sender='quiz.Category')
    def create_category(sender, instance, created, **kwargs):
        if created:
            practice_tag = Tag.objects.create(text=instance.name + "-practice")
            quiz = Quiz.objects.create(name=' '.join([instance.name, "Practice"]),
                                       can_retake=True,
                                       num_questions=10)
            quiz.tags.add(practice_tag)
            instance.practice_quiz = quiz
            instance.save()

    @property
    def practice_tag(self) -> Tag:
        return self.practice_quiz.tags.get(text=self.name + "-practice")

    def __str__(self):
        return self.name

class Question(models.Model, AddTagMixin):
    text = models.TextField()
    category = models.ForeignKey(Category, related_name="questions", on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now)
    media = models.ForeignKey('QuestionMedia', related_name="media", blank=True, null=True, on_delete=models.DO_NOTHING)
    tags = models.ManyToManyField(Tag, blank=True, related_name="questions")

    BASIC = 'Basic'
    INTERMEDIATE = 'Intermediate'
    EXPERT = 'Expert'
    DIFFICULTY_CHOICES = (
        (BASIC, BASIC),
        (INTERMEDIATE, INTERMEDIATE),
        (EXPERT, EXPERT),
    )

    difficulty = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES,
        default=BASIC,
    )

    def save_related(self, request, form, formsets, change):
        # ensures that all_tag exists after save
        super(GroupAdmin, self).save_related(request, form, formsets, change)
        form.instance.add_all_tag()

    @receiver(post_save, sender='quiz.Question')
    def save_question(sender, instance, created, **kwargs):
        instance.add_tag('all')

    def __str__(self):
        return self.category.name + " - Question " + str(self.id)


class QuestionMedia(models.Model):
    IMAGE = 'IMG'
    VIDEO = 'VID'
    AUDIO = 'AUD'
    MEDIA_CHOICES = (
        (IMAGE, 'Image'),
        (VIDEO, 'Video'),
        (AUDIO, 'Audio')
    )

    media_file = models.FileField(upload_to="questions/")
    media_type = models.CharField(max_length=3, choices=MEDIA_CHOICES)

    def __str__(self):
        return f"{self.media_type} - {path.basename(self.media_file.name)}"


class Answer(models.Model):
    text = models.TextField()
    is_correct = models.BooleanField()
    question = models.ForeignKey(Question, related_name="answers", on_delete=models.CASCADE)
    num = models.IntegerField()

    class Meta:
        unique_together=('num', 'question')

    def __str__(self):
        return "Question " + str(self.question.id) + " - Answer"

class Feedback(models.Model):
    text = models.CharField(max_length=500, null=True)
    time = models.DateTimeField(null=True)
    student = models.CharField(max_length=50, null=True)

class QuestionUserData(models.Model):
    """
    Stores student-specific metadata for each question. Time it took to complete, what the student answered, etc
    """

    student = models.ForeignKey(Student, related_name="question_data", on_delete=models.CASCADE)
    question = models.ForeignKey(Question, related_name="question_data", on_delete=models.CASCADE)
    quiz_userdata = models.ForeignKey("QuizUserData", related_name="question_data", on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, blank=True, null=True, related_name="question_data", on_delete=models.CASCADE)
    time_started = models.DateTimeField(default=timezone.now)
    time_completed = models.DateTimeField(blank=True, null=True)
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return "Question " + str(self.question.id) + " Data - " + self.student.user.username

    class Meta:
        get_latest_by = 'time_started'
        unique_together = ('question', 'student', 'quiz_userdata')

class QuizUserData(models.Model):
    """
    Stores student-specific metadata for each quiz. Time it took to complete, etc.
    """

    student = models.ForeignKey(Student, related_name="quiz_data", on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, related_name="quiz_data", on_delete=models.CASCADE)
    time_started = models.DateTimeField(default=timezone.now)
    time_completed = models.DateTimeField(blank=True, null=True)

    class Meta:
        get_latest_by = 'time_started'

    def __str__(self):
        return "Quiz " + str(self.quiz.name) + " Data - " + self.student.user.username

    def is_completed(self):
        return self.time_completed is not None

    def is_out_of_time(self):
        end_time = self.time_started + self.quiz.max_time
        return (self.time_completed or timezone.now()) > end_time

    def is_out_of_questions(self):
        return (self.quiz.num_questions != -1 and len(self.get_answered_questions()) >= self.quiz.num_questions) or len(self.get_unanswered_questions()) == 0

    def get_answered_questions(self):
        user_data = QuestionUserData.objects.filter(student=self.student, quiz_userdata=self).exclude(time_completed=None)
        started_questions = Question.objects.filter(question_data__in=user_data)
        return started_questions

    def get_unanswered_questions(self):
        question_set = self.quiz.questions.exclude(id__in=self.get_answered_questions())
        return question_set

    def is_done(self):
        return self.is_completed() or self.is_out_of_time() or self.is_out_of_questions()


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

    leadership_refresher = models.BooleanField()
    leadership_date = models.DateField(null=True)

    most_used_device = models.CharField(max_length=4, choices=DEVICE_CHOICES)
    internet_reliability = models.IntegerField(choices=DEVICE_CHOICES)

    work_device_hours = models.DecimalField(max_digits=4, decimal_places=2)
    personal_device_hours = models.DecimalField(max_digits=4, decimal_places=2)

