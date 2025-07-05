from django.urls import path
from .views import (EventCreateView, EventListView,EventDetailView,VoteCreateView,
                    ContestantCreateView, ContestantListView,EventUpdateDeleteView,
                    ContestantUpdateDeleteView, PaystackInitPaymentView, PaystackVerifyPaymentView,
                    ToggleVotingStatusView)

urlpatterns = [
    path('events/create/', EventCreateView.as_view(), name='event-create'),
    path('events/', EventListView.as_view(), name='event-list'),
    path('events/<str:event_id>/', EventDetailView.as_view(), name='event-detail'),
    path('events/<str:event_id>/manage/', EventUpdateDeleteView.as_view(), name='event-manage'),
    path('events/<str:event_id>/voting-status/', ToggleVotingStatusView.as_view(), name='toggle-voting'),

    path('contestants/<str:event_id>/manage/', ContestantUpdateDeleteView.as_view(), name='contestant-manage'),
    path('contestants/create/', ContestantCreateView.as_view(), name='contestant-create'),
    path('contestants/<str:event_id>/', ContestantListView.as_view(), name='contestant-list'),

    path('payments/init/', PaystackInitPaymentView.as_view(), name='paystack-init'),
    path('payments/verify/', PaystackVerifyPaymentView.as_view(), name='paystack-verify'),
]

