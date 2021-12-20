from django.shortcuts import redirect, render
from .models import Transaction, TransactionStatus
from accounts.models import User


def list(request):
    if not request.user.is_authenticated:
        return redirect('log_in')
    else:
        transactions = Transaction.objects.all()
        return render(request, 'trades/list_transactions.html', {
            'transactions':transactions
            })


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
            description=request.POST.get('description'),
            creator=request.user,
            executor=excutors[0],
        ).save()

    users = User.objects.all().exclude(email=request.user.email)
    return render(request, 'trades/create_transaction.html', {'users': users})


def update_transaction(request, tran_id):
    if not request.user.is_authenticated:
        return redirect('log_in')
    if request.method == 'POST':
        transaction = Transaction.objects.filter(id=tran_id)

        if len(transaction) == 0:
            return render(request, "trades/error.html")
        
        if not request.POST.get('description'):
            import pdb;pdb.set_trace()
            return render(request, "trades/error.html")
        user_id = request.POST.get('executor_id')
        users = User.objects.filter(id=user_id)
        if len(users) == 0:
            return render(request, "trades/error.html")

        transaction = Transaction.POST.update(id=tran_id)
        transaction.description=Transaction.POST.get('description')
        transaction.executor=Transaction.POST.get('executor')
        transaction.save()
        return redirect("transactions")
    else:
        transaction=Transaction.objects.filter(id=tran_id)
        transactions = Transaction.objects.all()
        return render(request, 'trades/edit_form.html', {'transactions':transactions})
 

def delete(request, tran_id):
    if not request.user.is_authenticated:
        return redirect('log_in')

    transaction = Transaction.objects.filter(id=tran_id)
    transaction.delete()
    return redirect("transactions")

