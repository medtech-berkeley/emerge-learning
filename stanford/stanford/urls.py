from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index, change_user_info, dashboard
from rest_framework import routers
from quiz.views import QuestionViewSet, AnswerViewSet, QuizViewSet, QuestionUserDataViewSet, StudentViewSet, StudentStatsViewSet, QuizUserDataViewSet, QuestionFeedbackViewSet, LeaderboardStatViewSet, EventViewSet
from quiz.views import submit_consent_form
from quiz.views import OverallPracticeLeaderboardStatViewSet, OverallQuizLeaderboardStatViewSet, CurrentWeeklyQuizLeaderboardStatViewSet, PreviousWeeklyQuizLeaderboardStatViewSet
from quiz.views import get_question, submit_answer, get_quiz_results, get_stats, submit_demographics_form, upload_questions, send_email_view, upload_quizzes, submit_feedback, start_quiz
from quiz.views import EventTableView, StudentTableView, QuestionUserDataTableView, QuizUserDataTableView
from quiz.views import AnswerTableView, QuestionTableView, QuizTableView, DemographicsTableView
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import signup, logins, activate, resend_verification
from django.contrib.auth import views as auth_views
from django.conf import settings

import os

api_router = routers.SimpleRouter()
api_router.register(r'questions', QuestionViewSet, 'Question')
api_router.register(r'answers', AnswerViewSet, 'Answer')
api_router.register(r'quizzes', QuizViewSet, 'Quiz')
api_router.register(r'questionuserdata', QuestionUserDataViewSet, 'QuestionUserData')
api_router.register(r'quizuserdata', QuizUserDataViewSet, 'QuizUserData')
api_router.register(r'students', StudentViewSet, 'Student')
api_router.register(r'weeklyleaderboard', CurrentWeeklyQuizLeaderboardStatViewSet, 'Student')
api_router.register(r'previousleaderboard', PreviousWeeklyQuizLeaderboardStatViewSet, 'Student')
api_router.register(r'quizleaderboard', OverallQuizLeaderboardStatViewSet, 'Student')
api_router.register(r'practiceleaderboard', OverallPracticeLeaderboardStatViewSet, 'Student')
api_router.register(r'studentstats', StudentStatsViewSet, 'StudentStats')
api_router.register(r'feedback', QuestionFeedbackViewSet, 'QuestionFeedback')
api_router.register(r'events', EventViewSet, 'Events')

tables = [
    path('events', EventTableView.as_view()),
    path('students', StudentTableView.as_view()),
    path('question_userdata', QuestionUserDataTableView.as_view()),
    path('quiz_userdata', QuizUserDataTableView.as_view()),
    path('quizzes', QuizTableView.as_view()),
    path('questions', QuestionTableView.as_view()),
    path('answers', AnswerTableView.as_view()),
    path('demographics', DemographicsTableView.as_view()),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('profile/update', change_user_info),
    path('profile/consentsurvey', submit_consent_form),
    path('profile/demosurvey', submit_demographics_form),
    path('quiz/feedback', submit_feedback),
    path('quiz/question', get_question),
    path('quiz/answer', submit_answer),
    path('quiz/results', get_quiz_results),
    path('quiz/start', start_quiz),
    path('api/', include(api_router.urls)),
    # path('tables/', include(tables)),
    path('signup/', signup, name='signup'),
    re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', activate, name='activate'),
    path('login/', logins, name='login_real'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),
    path('stats/', get_stats, name='stats'),
    path('instructor/uploadquestions/', upload_questions),
    path('instructor/send_email/', send_email_view),
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='password_reset_form.html'), name='password_reset_real'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),
    path('instructor/uploadquizzes/', upload_quizzes),
    path('resend_verification', resend_verification, name='resend_verification'),
    re_path(r'^dashboard/.*$', dashboard, name='dashboard')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
