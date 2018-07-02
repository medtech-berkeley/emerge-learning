from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from quiz.models import Student
import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

def index(request):
    if not request.user.is_authenticated:
        if request.method == 'POST':
            if request.POST['password'] == request.POST['password1']:
                try:
                    User.objects.get(username = request.POST['username'])
                    return render(request, 'index.html', {'error':'Username has already been taken.'})
                except User.DoesNotExist:
                    try:
                        if not request.POST['name']:
                            return render(request, 'index.html', {'error':'Please provide full name'})
                        if not request.POST['username']:
                            return render(request, 'index.html', {'error':'Please provide username'})
                        if not request.POST['email']:   
                            return render(request, 'index.html', {'error':'Please provide email'})
                        if not request.POST['password']:   
                            return render(request, 'index.html', {'error':'Please provide password'})    
                        user = User.objects.create_user(request.POST['username'], request.POST['email'], request.POST['password'])
                        login(request, user)
                        student = Student.objects.get(user=user)
                        student.name = request.POST['name']
                        if 'image' in request.FILES:
                            student.image = request.FILES['image']
                        else:
                            r = requests.get("http://dismagazine.com/uploads/2011/08/notw_silhouette-1.jpg")
                            img_temp = NamedTemporaryFile(delete=True)
                            img_temp.write(r.content)
                            img_temp.flush()
                            student.image.save("image.jpg", File(img_temp), save=True)
                        student.save()
                        login(request, user)
                        return redirect('login')
                    except:
                        return render(request, 'index.html', {'error':'ERROR'})
            else:
                return render(request, 'index.html', {'error':'Passwords didn\'t match'})
        else:
            return render(request, 'index.html')
    if request.method == 'POST':
        user = request.user
        student = Student.objects.get(user=user)
        if request.POST['name']:
            student.name = request.POST['name']
        if request.POST['location']:
            student.location = request.POST['location']
        if request.POST['description']:
            student.description = request.POST['description']
        if 'image' in request.FILES: 
            student.image = request.FILES['image']
        student.save()
        return render(request, 'index.html')
    else:
        return render(request, 'dashboard.html')


# def signup(request):
    