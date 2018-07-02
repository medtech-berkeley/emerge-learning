"""stanford URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index
from rest_framework import routers
from quiz.views import QuestionViewSet, AnswerViewSet, CategoryViewSet, QuestionUserDataViewSet, StudentViewSet, StudentsStatsViewSet
from quiz.views import get_question, submit_answer, get_category_results
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import logins, logout_view
from django.conf import settings

import os

router = routers.SimpleRouter()
router.register(r'questions', QuestionViewSet, 'Question')
router.register(r'answers', AnswerViewSet, 'Answer')
router.register(r'categories', CategoryViewSet, 'Category')
router.register(r'questionuserdata', QuestionUserDataViewSet, 'QuestionUserData')
router.register(r'students', StudentViewSet, 'Student')
router.register(r'data', StudentsStatsViewSet, 'StudentStats')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='dashboard'),
    path('profile/', index),
    path('settings/', index),
    path('quiz/question', get_question),
    path('quiz/answer', submit_answer),
    path('quiz/results', get_category_results),
    path('api/', include(router.urls)),
    path('login/', logins, name='login'),
    path('logout/', logout_view, name='logout'),
    # re_path(r'.*', index),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
