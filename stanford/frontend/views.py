from django.shortcuts import render
from quiz.models import Student

def index(request):
    if not request.user.is_authenticated:
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
        return render(request, 'dashboard.html')
    else:
        return render(request, 'dashboard.html')
