from django.contrib import admin
from django.urls import path, include, re_path
from frontend.views import index, change_user_info, dashboard
from rest_framework import routers
from quiz.views import QuestionViewSet, AnswerViewSet, CategoryViewSet, QuestionUserDataViewSet, StudentViewSet, StudentStatsViewSet, CategoryUserDataViewSet, FeedbackViewSet
from quiz.views import get_question, submit_answer, get_category_results, get_stats, submit_demographics_form, upload_questions, upload_categories, submit_feedback
from django.conf import settings
from django.conf.urls.static import static
from accounts.views import signup, logins, logout_view
from django.conf import settings

import os

router = routers.SimpleRouter()
router.register(r'questions', QuestionViewSet, 'Question')
router.register(r'answers', AnswerViewSet, 'Answer')
router.register(r'categories', CategoryViewSet, 'Category')
router.register(r'questionuserdata', QuestionUserDataViewSet, 'QuestionUserData')
router.register(r'categoryuserdata', CategoryUserDataViewSet, 'CategoryUserData')
router.register(r'students', StudentViewSet, 'Student')
router.register(r'studentstats', StudentStatsViewSet, 'StudentStats')
router.register(r'feedback', FeedbackViewSet, 'Feedback')


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
    path('login/', logins, name='login'),
    path('logout/', logout_view, name='logout'),
    path('stats/', get_stats, name='stats'),
    path('instructor/uploadquestions/', upload_questions),
    path('instructor/uploadcategories/', upload_categories),
    re_path(r'^dashboard/.*$', dashboard, name='dashboard')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
