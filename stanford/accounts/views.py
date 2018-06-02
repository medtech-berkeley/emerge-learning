from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from quiz.models import Student

# Create your views here.
def signup(request):
    if request.method == 'POST':
        if request.POST['password'] == request.POST['password1']:
            try:
                User.objects.get(username = request.POST['username'])
                return render(request, 'accounts/signup.html', {'error':'Username has already been taken.'})
            except User.DoesNotExist:
                user = User.objects.create_user(request.POST['username'], request.POST['email'], request.POST['password'])
                login(request, user)
                student = Student.objects.get(user=user)
                student.name = request.POST['name']
                if request.FILES['image']:
                    student.image = request.FILES['image']
                student.save()
                login(request, user)
                return redirect('login')
                # return render(request, 'accounts/login.html')
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

def logout_view(request):
    logout(request)
    return redirect('login')