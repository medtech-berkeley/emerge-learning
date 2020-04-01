from django.contrib import admin
from .models import Question, Quiz, Student, QuestionUserData, Answer, Tag
from .models import QuestionMedia, QuizUserData, Feedback
from .models import Category, Badge, Event, DeviceData
from .models import Course

# Register your models here.


class AnswerInline(admin.StackedInline):
    model = Answer


class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]


admin.site.register(Question, QuestionAdmin)
admin.site.register(Category)
admin.site.register(QuestionMedia)
admin.site.register(Quiz)
admin.site.register(Student)
admin.site.register(QuestionUserData)
admin.site.register(Tag)
admin.site.register(QuizUserData)
admin.site.register(Feedback)
admin.site.register(Badge)
admin.site.register(Event)
admin.site.register(DeviceData)
admin.site.register(Course)
