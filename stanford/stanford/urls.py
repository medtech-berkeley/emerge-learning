from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index, change_user_info, dashboard
from rest_framework import routers
from quiz.views import StudentViewSet, StudentStatsViewSet, QuizUserDataViewSet, QuestionFeedbackViewSet, InstructorCourseViewSet, PublicCourseViewSet
from quiz.views import QuestionViewSet, AnswerViewSet, QuizViewSet, QuestionUserDataViewSet
from quiz.views import LeaderboardStatViewSet, EventViewSet, StudentCourseViewSet
from quiz.views import submit_consent_form, submit_covid19_form
from quiz.views import OverallPracticeLeaderboardStatViewSet, OverallQuizLeaderboardStatViewSet, CurrentWeeklyQuizLeaderboardStatViewSet, PreviousWeeklyQuizLeaderboardStatViewSet
from quiz.views import get_question, submit_answer, get_quiz_results, get_stats, submit_demographics_form, upload_questions, send_email_view, send_whatsapp_view, upload_quizzes, submit_feedback, start_quiz, sign_up_course, remove_course
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import signup, logins, activate, resend_verification
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
router.register(r'weeklyleaderboard', CurrentWeeklyQuizLeaderboardStatViewSet, 'Student')
router.register(r'previousleaderboard', PreviousWeeklyQuizLeaderboardStatViewSet, 'Student')
router.register(r'quizleaderboard', OverallQuizLeaderboardStatViewSet, 'Student')
router.register(r'practiceleaderboard', OverallPracticeLeaderboardStatViewSet, 'Student')
router.register(r'studentstats', StudentStatsViewSet, 'StudentStats')
router.register(r'feedback', QuestionFeedbackViewSet, 'QuestionFeedback')
router.register(r'events', EventViewSet, 'Events')
router.register(r'courses', StudentCourseViewSet, 'Courses')
router.register(r'publiccourses', PublicCourseViewSet, 'Courses')
router.register(r'instructorcourses', InstructorCourseViewSet, 'InstructorCourses')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('profile/update', change_user_info),
    path('settings/addcourse/', sign_up_course),
    path('settings/removecourse/', remove_course),
    path('profile/consentsurvey', submit_consent_form),
    path('profile/demosurvey', submit_demographics_form),
    path('profile/covid19survey', submit_covid19_form),
    path('quiz/feedback', submit_feedback),
    path('quiz/question', get_question),
    path('quiz/answer', submit_answer),
    path('quiz/results', get_quiz_results),
    path('quiz/start', start_quiz),
    path('api/', include(router.urls)),
    path('signup/', signup, name='signup'),
    re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', activate, name='activate'),
    path('login/', logins, name='login_real'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),
    path('stats/', get_stats, name='stats'),
    path('instructor/uploadquestions/', upload_questions),
    path('instructor/send_email/', send_email_view),
    path('instructor/send_whatsapp/', send_whatsapp_view),
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='password_reset_form.html'), name='password_reset_real'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),
    path('instructor/uploadquizzes/', upload_quizzes),
    path('resend_verification', resend_verification, name='resend_verification'),
    re_path(r'^dashboard/.*$', dashboard, name='dashboard')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
