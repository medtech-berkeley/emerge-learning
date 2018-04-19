from django.shortcuts import render


def index(request):
    return render(request, 'index.html')

def profile(request):
    return render(request, 'profile.html')
