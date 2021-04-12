from django.shortcuts import render, redirect, reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from quiz.models import Student, Event, EventType, DeviceData
import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.views.decorators.cache import never_cache
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib.sites.shortcuts import get_current_site
import logging
from django.conf import settings
from django.http import HttpResponse

import traceback

logging.basicConfig(format='%(asctime)s %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

def send_login_event(student, request):
    if request.user_agent.is_tablet:
        device_type = 'tablet'
    elif request.user_agent.is_mobile:
        device_type = 'mobile'
    else:
        device_type = 'computer'
    device_data = DeviceData.objects.create(
        device_family=request.user_agent.device.family,
        browser_family=request.user_agent.browser.family,
        browser_version=request.user_agent.browser.version_string,
        os_family=request.user_agent.os.family,
        os_version=request.user_agent.os.version_string,
        device_type=device_type
    )
    return Event.objects.create(event_type=EventType.Login.value, student=student, device_data=device_data)


def signup(request):
    if request.method == 'POST':
        if request.POST['password'] == request.POST['password_confirm']:
            if User.objects.filter(username=request.POST['username']).exists():
                return redirect(reverse('index') + '?error=Username has already been taken.')
            if User.objects.filter(email=request.POST['email']).exists():
                return redirect(reverse('index') + '?error=An account with this email already exists')
            try:
                country_code = request.POST['country_code']
                phone_no = request.POST['phone_no'].strip()
                whatsapp_notifs = 'whatsapp_notifs' in request.POST
                if whatsapp_notifs and not phone_no:
                    return redirect(reverse('index') + '?error=Phone number required for Whatsapp Notifications')
                elif (phone_no) and (country_code == 'Country'):
                    return redirect(reverse('index') + '?error=Please specify country code')
                elif (not phone_no.isnumeric()) or len(phone_no) != 10:
                    return redirect(reverse('index') + '?error=Please assure phone number is 10 digit, all numbers')
                merged_phone_no = country_code[:-6] + phone_no

                if (Student.objects.filter(phone=merged_phone_no).exists()):
                    return redirect(reverse('index') + '?error=This phone number is already in use. Please enter a different number')


                user = User.objects.create_user(
                    request.POST['username'], 
                    request.POST['email'], 
                    request.POST['password']
                    )
                user.is_active = False
                user.save()

                student = Student.objects.get(user=user)
                student.name = request.POST['username']
                if 'image' in request.FILES:
                    student.image = request.FILES['image']
                student.phone = merged_phone_no
                student.whatsapp_notifs = whatsapp_notifs
                student.save()

                # Send Email
                if not settings.DEBUG:
                    current_site = get_current_site(request)
                    mail_subject = 'Please activate your Emerge Learning account'
                    message = render_to_string('acc_active_email.html', {
                        'user': user,
                        'domain': current_site.domain,
                        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                        'token': account_activation_token.make_token(user),
                    })
                    to_email = request.POST['email']
                    email = EmailMessage(
                                mail_subject, message, to=[to_email]
                    )
                    email.send()
                else:
                    user.is_active = True
                    user.save()
                    send_login_event(user.student, request)
                    login(request, user)
                    return redirect(reverse('dashboard'))

                return render(request, 'accounts/login.html', {'error':'An account verification email has been sent!', 'username': user.username})
            except Exception as e:
                return redirect(reverse('index') + '?error=Unknown error has occurred...')
        else:
            return redirect(reverse('index') + "?error='Passwords didn't match")
    else:
        return redirect('index')


def logins(request):
    if request.method == 'POST':
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            send_login_event(user.student, request)
            login(request, user)
            return redirect('dashboard')
        else:
            user = User.objects.filter(username=request.POST['username'])
            if user.exists() and not user.first().is_active:
                print(request.POST['username'])
                return render(request, 'accounts/login.html', {'error':'Account not verified. Please check your email.', 'username':request.POST['username']})
            return render(request, 'accounts/login.html', {'error':'Incorrect username or password.'})
    else:
        return render(request, 'accounts/login.html')

@never_cache
def logout_view(request):
    logout(request)
    return redirect('dashboard')

def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)

        mail_subject = 'Welcome to Emerge Learning!'
        message = render_to_string('acc_verified_email.html', {
            'user': user
        })
        email = EmailMessage(
                    mail_subject, message, to=[user.email]
        )
        email.send()        
        return redirect('dashboard')
    else:
        return HttpResponse('Activation link is invalid!')

def resend_verification(request): 
    print(request.POST['user'])
    user = User.objects.get(username=request.POST['user'])
    current_site = get_current_site(request)
    mail_subject = 'Emerge Learning: Verification Resent'
    message = render_to_string('acc_active_email.html', {
        'user': user,
        'domain': current_site.domain,
        'uid':urlsafe_base64_encode(force_bytes(user.pk)).decode(),
        'token':account_activation_token.make_token(user),
    })
    to_email = user.email
    email = EmailMessage(
                mail_subject, message, to=[to_email]
    )
    email.send()
    return render(request, 'accounts/login.html', {'error':'An account verification email has been sent!', 'resend': 'Resend Verification'})

