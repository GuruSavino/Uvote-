from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView, status
from rest_framework.generics import CreateAPIView, GenericAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer


# class RootAPIView(APIView):
#     permission_classes = [AllowAny]

#     @swagger_auto_schema(
#         operation_summary="Root API Endpoint",
#         operation_description="Provides the URLs for the available endpoints in the API.",
#         responses={
#             200: openapi.Response(
#                 'Successful operation',
#                 schema=openapi.Schema(
#                     type=openapi.TYPE_OBJECT,
#                 )
#             )
#         },
#         tags=['Root']
#     )
#     def get(self, request, *args, **kwargs):
#         api_urls = {
#             "Register": "/api/users/register/",
#             "Login": "/api/users/login/",
#             "User Profile (GET/PUT)": "/api/users/profile/",
#             "Swagger Docs": "/swagger/",
#             "Admin Panel": "/admin/"
#         }
#         return Response(api_urls, status=status.HTTP_200_OK)
    


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]

    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

    @swagger_auto_schema(
        operation_description="Register a new user",
        responses={201: "User created successfully"},
        request_body=RegisterSerializer,
        tags=['Authentication']
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'message': 'User registered successfully.',
            'user': UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)



class LoginView(GenericAPIView):
    permission_classes = [AllowAny]

    serializer_class = LoginSerializer

    @swagger_auto_schema(
        operation_description="Login and obtain access/refresh tokens",
        responses={200: "Login successful with JWT tokens"},
        request_body=LoginSerializer,
        tags=['Authentication'],
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        tokens = get_tokens_for_user(user)
        return Response({
            'message': 'Login successful.',
            'user': UserSerializer(user).data,
            'tokens': tokens
        }, status=status.HTTP_200_OK)



class ProfileView(RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    @swagger_auto_schema(
        operation_summary="Retrieve user profile",
        operation_description="Get the currently authenticated user's profile data.",
        tags=['Authentication'],
        responses={200: UserSerializer}
    )
    def get(self, request, *args, **kwargs):
        user_data = UserSerializer(request.user).data
        return Response({
            'message': 'User profile retrieved successfully.',
            'user': user_data
        }, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Update user profile",
        operation_description="Completely update the authenticated user's profile.",
        tags=['Authentication'],
        responses={200: UserSerializer},
        request_body=UserSerializer
    )
    def put(self, request, *args, **kwargs):
        response = self.update(request, *args, **kwargs)
        response.data = {
            'message': 'Profile updated successfully.',
            'user': response.data
        }
        return response

    @swagger_auto_schema(
        operation_summary="Partially update user profile",
        operation_description="Partially update fields like username or phone number.",
        tags=['Authentication'],
        responses={200: UserSerializer},
        request_body=UserSerializer
    )
    def patch(self, request, *args, **kwargs):
        response = self.partial_update(request, *args, **kwargs)
        response.data = {
            'message': 'Profile partially updated successfully.',
            'user': response.data
        }
        return response

