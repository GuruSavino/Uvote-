from django.db import models
from accounts.models import CustomUser  # adjust if the user model is in a different app
from utils.generate_utils import generate_ids  # or define your own

class Event(models.Model):
    VOTE_TYPE_CHOICES = [
        ('free', 'Free'),
        ('paid', 'Paid'),
    ]

    organizer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='events')
    event_id = models.CharField(default=generate_ids, unique=True, editable=False)
    event_name = models.CharField(max_length=255)
    logo_url = models.URLField(blank=True, null=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    voting_status = models.BooleanField(default=True)  # True = voting allowed, False = disabled
    vote_type = models.CharField(max_length=10, choices=VOTE_TYPE_CHOICES)
    max_votes_per_user = models.PositiveIntegerField(default=1)
    price_per_vote = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.event_name  


class Contestant(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='contestants')
    contestant_name = models.CharField(max_length=255)
    bio = models.TextField(blank=True, null=True)
    photo_url = models.URLField(blank=True, null=True)
    vote_count = models.PositiveIntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.contestant_name} - {self.event.event_name}"

class Vote(models.Model):
    contestant = models.ForeignKey('Contestant', on_delete=models.CASCADE, related_name='votes')
    timestamp = models.DateTimeField(auto_now_add=True)
    voter_ip = models.GenericIPAddressField(null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} vote(s) for {self.contestant.contestant_name} at {self.timestamp}"


class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
    ]
    vote = models.OneToOneField(Vote, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    reference = models.CharField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    provider = models.CharField(max_length=20, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.reference} - {self.status}"

