from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView,RetrieveUpdateDestroyAPIView
from .models import Event
from .serializers import EventSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Contestant
from .serializers import ContestantSerializer,VoteSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from .models import Contestant, Vote
import requests
from django.conf import settings
from rest_framework.views import APIView
from drf_yasg import openapi
from .models import Payment
from datetime import datetime
from .serializers import PaystackVerifyRequestSerializer


# This view handles the creation of events by organizers.
class EventCreateView(CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Create a new event",
        operation_description="Authenticated users (organizers) can create events.",
        tags=["Organizer"]
    )
    def perform_create(self, serializer):
        self.created_event = serializer.save(organizer=self.request.user)

    def post(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {
            "message": "Event created successfully.",
            "event": response.data
        }
        return response


class EventListView(ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Event.objects.filter(organizer=self.request.user)

    @swagger_auto_schema(
        operation_summary="List organizer's events",
        operation_description="List all events created by the authenticated organizer.",
        tags=["Organizer"]
    )
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "message": "Events retrieved successfully.",
            "events": serializer.data
        }, status=status.HTTP_200_OK)


class EventDetailView(RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="Public single event view",
        operation_description="Anyone can view details of a specific event by ID.",
        tags=["Organizer"]
    )
    def get(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = self.get_serializer(event)
        return Response({
            "message": "Event retrieved successfully.",
            "event": serializer.data
        }, status=status.HTTP_200_OK)
    


class EventUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj.organizer != self.request.user:
            raise PermissionDenied("You are not authorized to modify this event.")
        return obj
    
    @swagger_auto_schema(
        operation_summary="Retrieve a single event",
        tags=["Organizer"]
    )
    def get(self, request, *args, **kwargs):
        event = self.get_object()
        serializer = self.get_serializer(event)
        return Response({
            "message": "Event retrieved successfully.",
            "event": serializer.data
        })
    
    @swagger_auto_schema(
        operation_summary="Update an event",
        operation_description="Allows the organizer to update their event.",
        tags=["Organizer"]
    )
    def put(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        response.data = {
            "message": "Event updated successfully.",
            "event": response.data
        }
        return response

    @swagger_auto_schema(
        operation_summary="Delete an event",
        operation_description="Allows the organizer to delete their event.",
        tags=["Organizer"]
    )
    def delete(self, request, *args, **kwargs):
        super().delete(request, *args, **kwargs)
        return Response({
            "message": "Event deleted successfully."
        }, status=status.HTTP_204_NO_CONTENT)

# Contestant Views

class ContestantCreateView(CreateAPIView):
    serializer_class = ContestantSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Add a contestant to an event",
        operation_description="Organizer can add a contestant to their event.",
        tags=["Organizer"]
    )
    def post(self, request, *args, **kwargs):
        event_id = request.data.get("event")
        event = Event.objects.get(event_id=event_id)

        if event.organizer != request.user:
            raise PermissionDenied("You are not authorized to add contestants to this event.")

        response = super().create(request, *args, **kwargs)

        return Response({
            "message": "Contestant added successfully.",
            "contestant": response.data,
            "event": EventSerializer(event).data
        }, status=status.HTTP_201_CREATED)



class ContestantListView(ListAPIView):
    serializer_class = ContestantSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Contestant.objects.filter(event__id=self.kwargs['event_id'])

    @swagger_auto_schema(
        operation_summary="List contestants for an event",
        operation_description="Anyone can view contestants in a specific event.",
        tags=["Organizer"]
    )
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "message": "Contestants retrieved successfully.",
            "contestants": serializer.data
        }, status=status.HTTP_200_OK)


class ContestantUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Contestant.objects.all()
    serializer_class = ContestantSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj.event.organizer != self.request.user:
            raise PermissionDenied("You are not authorized to modify this contestant.")
        return obj

    @swagger_auto_schema(
        operation_summary="Update a contestant",
        operation_description="Allows the organizer to update a contestant in their event.",
        tags=["Organizer"]
    )
    def put(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        response.data = {
            "message": "Contestant updated successfully.",
            "contestant": response.data
        }
        return response

    @swagger_auto_schema(
        operation_summary="Delete a contestant",
        operation_description="Allows the organizer to delete a contestant from their event.",
        tags=["Organizer"]
    )
    def delete(self, request, *args, **kwargs):
        super().delete(request, *args, **kwargs)
        return Response({
            "message": "Contestant deleted successfully."
        }, status=status.HTTP_204_NO_CONTENT)



# This view allows organizers to toggle the voting status of their events.

class ToggleVotingStatusView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Toggle voting status for an event",
        operation_description="Organizer can enable or disable voting for their own event.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'voting_status': openapi.Schema(
                    type=openapi.TYPE_BOOLEAN,
                    description='True to enable voting, False to disable'
                )
            },
            required=['voting_status']
        ),
        responses={
            200: openapi.Response(
                description="Voting status updated.",
                examples={"application/json": {"message": "Voting turned off", "voting_status": False}}
            ),
            403: "Unauthorized access to this event"
        },
        tags=["Organizer"]
    )
    def patch(self, request, event_id):
        try:
            event = Event.objects.get(event_id=event_id)
        except Event.DoesNotExist:
            return Response({"message": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

        if event.organizer != request.user:
            raise PermissionDenied("You are not authorized to modify this event.")

        new_status = request.data.get("voting_status")
        if new_status is None:
            return Response({"message": "voting_status field is required."}, status=status.HTTP_400_BAD_REQUEST)

        event.voting_status = new_status
        event.save()

        return Response({
            "message": f"Voting turned {'on' if new_status else 'off'}.",
            "voting_status": event.voting_status
        }, status=status.HTTP_200_OK)


from django.shortcuts import get_object_or_404

# Vote Views
class VoteCreateView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_summary="Get contestant details before voting",
        operation_description="Returns details of a specific contestant (name, category, etc.)",
        tags=["Votes"]
    )
    def get(self, request, contestant_id, *args, **kwargs):
        contestant = get_object_or_404(Contestant, id=contestant_id)
        return Response({
            "message": "Contestant retrieved successfully.",
            "contestant": {
                "id": contestant.id,
                "name": contestant.contestant_name,
                "bio": contestant.bio,
                "photo_url": contestant.photo_url,
                "event": contestant.event.event_name
            }
        }, status=status.HTTP_200_OK)


# This view handles the creation of votes for contestants.
from .serializers import PaystackInitRequestSerializer

class PaystackInitPaymentView(APIView):
    permission_classes = [AllowAny]

    SUPPORTED_PROVIDERS = ['mtn', 'vodafone', 'airteltigo']

    @swagger_auto_schema(
        request_body=PaystackInitRequestSerializer,
        operation_summary="Initiate Mobile Money payment via Paystack",
        operation_description=(
            "Initiates a Paystack Mobile Money payment using voter's phone number. "
            "Supported providers: MTN, Vodafone, AirtelTigo."
        ),
        responses={
            200: openapi.Response(
                description="Payment initialized successfully.",
                examples={
                    "application/json": {
                        "message": "Mobile Money payment initialized successfully.",
                        "payment_url": "https://paystack.com/pay/xyz123abc",
                        "reference": "txn_ref_001"
                    }
                }
            ),
            400: "Missing phone_number, quantity, contestant_id, or provider.",
            502: "Failed to initiate payment with Paystack."
        },
        tags=["Payments"]
    )

    def post(self, request, *args, **kwargs):
        phone = request.data.get("phone_number")
        quantity = int(request.data.get("quantity", 1))
        contestant_id = request.data.get("contestant_id")
        provider = request.data.get("provider", "").lower()

        if not all([phone, quantity, contestant_id, provider]):
            return Response({
                "message": "phone_number, quantity, contestant_id, and provider are required."
            }, status=status.HTTP_400_BAD_REQUEST)

        if provider not in self.SUPPORTED_PROVIDERS:
            return Response({
                "message": f"Invalid provider. Supported: {', '.join(self.SUPPORTED_PROVIDERS)}"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            contestant = Contestant.objects.select_related('event').get(id=contestant_id)
        except Contestant.DoesNotExist:
            return Response({"message": "Invalid contestant."}, status=status.HTTP_404_NOT_FOUND)

        price_per_vote = contestant.event.price_per_vote or 0
        amount_kobo = int(price_per_vote * quantity * 100)

        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json",
        }

        email = f"{phone}@votemomo.app"  # synthetic email for Paystack

        data = {
            "email": email,
            "amount": amount_kobo,
            "channels": ["mobile_money"],
            "mobile_money": {
                "phone": phone,
                "provider": provider
            },
            "metadata": {
                "contestant_id": contestant_id,
                "quantity": quantity,
                "phone_number": phone,
                "provider": provider
            }
        }

        response = requests.post("https://api.paystack.co/transaction/initialize",
                                 json=data, headers=headers)

        if response.status_code != 200:
            return Response({
                "message": "Failed to initiate payment.",
                "details": response.json()
            }, status=status.HTTP_502_BAD_GATEWAY)

        return Response({
            "message": "Mobile Money payment initialized successfully.",
            "payment_url": response.json().get("data", {}).get("authorization_url"),
            "reference": response.json().get("data", {}).get("reference")
        }, status=status.HTTP_200_OK)


from django.utils import timezone

class PaystackVerifyPaymentView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=PaystackVerifyRequestSerializer,
        operation_summary="Verify Paystack payment",
        operation_description="Verifies a Paystack transaction by reference and creates a vote if successful.",
        responses={
            201: openapi.Response(
                description="Payment verified and vote recorded",
                examples={
                    "application/json": {
                        "message": "Payment verified and vote recorded successfully.",
                        "vote": {
                            "contestant": "Michael Adu",
                            "quantity": 3,
                            "timestamp": "2025-06-01T12:00:00Z"
                        }
                    }
                }
            ),
            409: "Payment already verified.",
            400: "Invalid or missing reference."
        },
        tags=["Payments"]
    )

    def post(self, request, *args, **kwargs):
        reference = request.data.get("reference")
        if not reference:
            return Response({"message": "Reference is required."}, status=status.HTTP_400_BAD_REQUEST)

        headers = {
            "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
            "Content-Type": "application/json"
        }

        url = f"https://api.paystack.co/transaction/verify/{reference}"
        response = requests.get(url, headers=headers)
        result = response.json()

        if response.status_code != 200 or not result.get("status"):
            return Response({
                "message": "Verification failed.",
                "details": result
            }, status=status.HTTP_400_BAD_REQUEST)

        data = result["data"]
        if data["status"] != "success":
            return Response({"message": "Payment not successful."}, status=status.HTTP_402_PAYMENT_REQUIRED)

        # Get metadata
        metadata = data.get("metadata", {})
        timestamp = data.get("paid_at")
        contestant_id = metadata.get("contestant_id")
        quantity = int(metadata.get("quantity", 1))
        ip = request.META.get("REMOTE_ADDR")
        phone_number = metadata.get("phone_number")
        provider = metadata.get("provider")


        try:
            contestant = Contestant.objects.select_related('event').get(id=contestant_id)
        except Contestant.DoesNotExist:
            return Response({"message": "Invalid contestant."}, status=status.HTTP_404_NOT_FOUND)
        event = contestant.event

        if not event.voting_status:
            return Response({"message": "Voting is currently disabled for this event."},
                            status=status.HTTP_403_FORBIDDEN)
        now = timezone.now()
        if now < event.start_date or now > event.end_date:
            return Response({"message": "Voting is not active at this time."},
                            status=status.HTTP_403_FORBIDDEN)
        # Create Vote
        vote = Vote.objects.create(
            contestant=contestant,
            timestamp = timestamp,
            voter_ip=ip,
            quantity=quantity,
        )

        # Create Payment record
        Payment.objects.create(
            vote=vote,
            amount=(data["amount"] / 100),
            quantity=quantity,
            reference=reference,
            phone_number=phone_number,
            provider=provider,
            status=data["status"],
            paid_at=datetime.strptime(data["paid_at"], "%Y-%m-%dT%H:%M:%S.%fZ")
        )

        return Response({
            "message": "Payment verified and vote recorded successfully.",
            "vote": {
                "contestant": contestant.contestant_name,
                "quantity": vote.quantity,
                "timestamp": vote.timestamp
            }
        }, status=status.HTTP_201_CREATED)
