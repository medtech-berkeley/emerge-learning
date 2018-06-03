from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from quiz.models import Student
import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

# Create your views here.
def signup(request):
    if request.method == 'POST':
        if request.POST['password'] == request.POST['password1']:
            try:
                User.objects.get(username = request.POST['username'])
                return render(request, 'accounts/signup.html', {'error':'Username has already been taken.'})
            except User.DoesNotExist:
                try:
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
                    return render(request, 'accounts/signup.html', {'error':'ERROR'})
        else:
            return render(request, 'accounts/signup.html', {'error':'Passwords didn\'t match'})
    else:
        return render(request, 'accounts/signup.html')
def logins(request):
    if request.method == 'POST':
        user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'accounts/login.html', {'error':'Incorrect password or username'})
    else:
        return render(request, 'accounts/login.html')
