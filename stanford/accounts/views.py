from django.shortcuts import render, redirect, reverse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from quiz.models import Student
import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile


def signup(request):
    if request.method == 'POST':
        if request.POST['password'] == request.POST['password_confirm']:
            try:
                User.objects.get(username=request.POST['username'])
                return redirect(reverse('dashboard') + '?error=Username has already been taken.')
            except User.DoesNotExist:
                try:
                    user = User.objects.create_user(request.POST['username'], request.POST['email'], request.POST['password'])
                    login(request, user)
                    student = Student.objects.get(user=user)
                    student.name = request.POST['username']
                    if 'image' in request.FILES:
                        student.image = request.FILES['image']
                    else:
                        r = requests.get("http://dismagazine.com/uploads/2011/08/notw_silhouette-1.jpg")
                        img_temp = NamedTemporaryFile(delete=True)
                        img_temp.write(r.content)
                        img_temp.flush()
                        student.image.save("image.jpg", File(img_temp), save=True)
                    student.save()
                    return redirect('dashboard')
                except Exception as e:
                    print(str(type(e)) + ":", e)
                    return redirect(reverse('dashboard') + '?error=Unknown error has occurred...')
        else:
            return redirect(reverse('dashboard') + "?error='Passwords didn't match")
    else:
        return redirect('dashboard')


def logins(request):
    if request.method == 'POST':
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            return render(request, 'accounts/login.html', {'error':'Incorrect password or username'})
    else:
        return render(request, 'accounts/login.html')


def logout_view(request):
    logout(request)
    return redirect('dashboard')
