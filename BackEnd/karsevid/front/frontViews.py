from django.shortcuts import render, HttpResponse

def login(request):
    return render(request, "front/login.html")
