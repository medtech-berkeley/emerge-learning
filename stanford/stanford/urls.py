from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index, change_user_info, dashboard
from rest_framework import routers
from quiz.views import QuestionViewSet, AnswerViewSet, QuizViewSet, QuestionUserDataViewSet, StudentViewSet, StudentStatsViewSet, QuizUserDataViewSet, QuestionFeedbackViewSet, LeaderboardStatViewSet
from quiz.views import get_question, submit_answer, get_quiz_results, get_stats, submit_demographics_form, upload_questions, upload_quizzes, submit_feedback
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import signup, logins
from django.contrib.auth import views as auth_views
from django.conf import settings

import os

router = routers.SimpleRouter()
router.register(r'questions', QuestionViewSet, 'Question')
router.register(r'answers', AnswerViewSet, 'Answer')
router.register(r'quizzes', QuizViewSet, 'Quiz')
router.register(r'questionuserdata', QuestionUserDataViewSet, 'QuestionUserData')
router.register(r'quizuserdata', QuizUserDataViewSet, 'QuizUserData')
router.register(r'students', StudentViewSet, 'Student')
router.register(r'leaderboard', LeaderboardStatViewSet, 'Student')
router.register(r'studentstats', StudentStatsViewSet, 'StudentStats')
router.register(r'feedback', QuestionFeedbackViewSet, 'QuestionFeedback')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('profile/update', change_user_info),
    path('profile/demosurvey', submit_demographics_form),
    path('quiz/feedback', submit_feedback),
    path('quiz/question', get_question),
    path('quiz/answer', submit_answer),
    path('quiz/results', get_quiz_results),
    path('api/', include(router.urls)),
    path('signup/', signup, name='signup'),
    path('login/', logins, name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),
    path('stats/', get_stats, name='stats'),
    path('instructor/uploadquestions/', upload_questions),
    path('instructor/uploadquizzes/', upload_quizzes),
    re_path(r'^dashboard/.*$', dashboard, name='dashboard')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
