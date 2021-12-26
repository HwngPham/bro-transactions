from django.shortcuts import render, redirect
from .models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login


def log_in(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('homepage')
        else:
            return render(request, 'accounts/error.html')

    return render(request, 'accounts/log_in.html')


def register(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    password_repeat = request.POST.get('password_repeat')
    if request.method == 'POST':
        if not email or not password or not password_repeat:
            return render(request, 'accounts/register.html')

        user_already_existed = len(User.objects.filter(email=email)) > 0
        if user_already_existed:
        # import pdb;pdb.set_trace()
            return render(request, 'accounts/error.html')

        if password != password_repeat:
            return render(request, 'accounts/error.html')

        user = User()
        user.email = email
        user.password = make_password(password)
        user.username = email.split("@")[0]
        user.save()
        return redirect('homepage')
    else:
        return render(request, 'accounts/register.html')


def log_out(request):
    request.session.flush()
    return redirect('homepage')
