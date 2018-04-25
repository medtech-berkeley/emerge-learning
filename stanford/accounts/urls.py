from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
import accounts.views
urlpatterns = [
    url(r'^accounts/', include('accounts.urls')),
    path('signup/', accounts.views.signup, name = 'signup'),
    path('login/', accounts.views.logins, name = 'login'),
]
