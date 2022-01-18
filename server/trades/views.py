from django.shortcuts import redirect, render
from .models import Transaction, TransactionStatus
from accounts.models import User


def list(request):
    if not request.user.is_authenticated:
        return redirect('log_in')

    transactions = Transaction.objects.all()
    return render(request, 'trades/list_transactions.html', {'transactions': transactions})


def create(request):
    if not request.user.is_authenticated:
        return redirect('log_in')

    if request.method == 'POST':
        excutors = User.objects.filter(
            id=request.POST.get('executor')
        )
        if len(excutors) == 0:
            return render(request, "accounts/error.html")

        Transaction(
            status=TransactionStatus.PENDING,
            amount=request.POST.get('amount'),
            description=request.POST.get('description'),
            creator=request.user,
            executor=excutors[0],
        ).save()

        return redirect('transactions')

    users = User.objects.all().exclude(email=request.user.email)
    return render(request, 'trades/create_transaction.html', {'users': users})


def update_transaction(request, tran_id):
    if not request.user.is_authenticated:
        return redirect('log_in')
    if request.method == 'POST':
        transactions = Transaction.objects.filter(id=tran_id)

        if len(transactions) == 0:
            return render(request, "trades/error.html")

        if not request.POST.get('description'):
            return render(request, "trades/error.html")

        user_id = request.POST.get('executor')
        users = User.objects.filter(id=user_id)
        if len(users) == 0:
            return render(request, "trades/error.html")

        transactions[0].amount = request.POST.get('amount')
        transactions[0].description = request.POST.get('description')
        transactions[0].save()
        return redirect("transactions")

    transactions = Transaction.objects.filter(id=tran_id)
    if len(transactions) == 0:
        return redirect("trades/error.html")

    users = User.objects.all().exclude(email=request.user.email)
    return render(request, 'trades/edit_transaction.html', {'transaction': transactions[0], 'users': users})


def delete(request, tran_id):
    if not request.user.is_authenticated:
        return redirect('log_in')

    transactions = Transaction.objects.filter(id=tran_id)
    if len(transactions) == 0:
        return render("trades/error.html")

    transactions.delete()
    return redirect("transactions")


def list_pending(request):
    if not request.user.is_authenticated:
        return redirect('log_in')
    transactions = Transaction.objects.filter(executor=request.user, status=1)
    return render(request, 'trades/pending.html', {'transactions': transactions})


def update_status(request):
    if not request.user.is_authenticated:
        return redirect('log_in')

    transactions = Transaction.objects.filter(executor=request.user, status=1)
    transactions.update(status=2)
    return redirect("transactions")
