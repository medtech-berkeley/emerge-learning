from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index, change_user_info, dashboard
from rest_framework import routers
from quiz.views import QuestionViewSet, AnswerViewSet, CategoryViewSet, QuestionUserDataViewSet, StudentViewSet, StudentStatsViewSet, CategoryUserDataViewSet, QuestionFeedbackViewSet, LeaderboardStatViewSet
from quiz.views import get_question, submit_answer, get_category_results, get_stats, submit_demographics_form, upload_questions, upload_categories, submit_feedback
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import signup, logins, activate
from django.contrib.auth import views as auth_views
from django.conf import settings

import os

router = routers.SimpleRouter()
router.register(r'questions', QuestionViewSet, 'Question')
router.register(r'answers', AnswerViewSet, 'Answer')
router.register(r'categories', CategoryViewSet, 'Category')
router.register(r'questionuserdata', QuestionUserDataViewSet, 'QuestionUserData')
router.register(r'categoryuserdata', CategoryUserDataViewSet, 'CategoryUserData')
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
    path('quiz/results', get_category_results),
    path('api/', include(router.urls)),
    path('signup/', signup, name='signup'),
    re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', activate, name='activate'),
    path('login/', logins, name='login_real'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),
    path('stats/', get_stats, name='stats'),
    path('instructor/uploadquestions/', upload_questions),
    path('instructor/uploadcategories/', upload_categories),
    re_path(r'^dashboard/.*$', dashboard, name='dashboard'), 
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='password_reset_form.html'), name='password_reset_real'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),
    # path('password_change/', auth_views.PasswordChangeView.as_view(template_name='password_change.html'), name='password_change'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
