from django.db import models as _
from accounts.models import User


class TransactionStatus(_.IntegerChoices):
    PENDING = 1
    CONFIRMED = 2


class Transaction(_.Model):
    status = _.IntegerField(choices=TransactionStatus.choices)
    amount = _.IntegerField(default=0)
    description = _.CharField(max_length=254)
    created_at = _.DateTimeField(auto_now_add=True)
    updated_at = _.DateTimeField(auto_now=True)
    creator = _.ForeignKey(User, on_delete=_.CASCADE, related_name='creator')
    executor = _.ForeignKey(User, on_delete=_.CASCADE, related_name='executor')

    def __str__(self):
        return self.description
