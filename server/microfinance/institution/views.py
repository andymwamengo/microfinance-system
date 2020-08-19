"""
django rest microfinance views with permission classes
"""

import numpy as np
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.db.models import Count
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .apps import InstitutionConfig
from .models import (User, MfiStakeholder, AdminFeedback,
                     UserFeedback, MfiReport, MfiBoard, MfiAddress,
                     MfiFeedback, IncomePrediction)
from .permissions import IsSuperUser, IsOwner, SuperUserPermission
from .serializers import (CustomTokenObtainPairSerializer, CustomUserSerializer,
                          UserDetailsSerializer,
                          MfiStakeholderSerializer, AdminFeedbackSerializer,
                          UserFeedbackSerializer,
                          MfiReportSerializer, MfiAddressSerializer,
                          MfiBoardSerializer,
                          MfiFeedbackSerializer, IncomePredictionSerializer)

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)


# Obtain token pair view
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer


# Register Custom mfi User view
class CustomUserCreateView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomUserSerializer
    users = User.objects.all()

    # register mfi user details
    def post(self, request):
        user_email = request.data
        if User.objects.filter(email=user_email):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# List all Mfi|Users APIView
class CustomUsersListAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    # mfi list view with filter with cache
    def get(self, request, **kwargs):
        user_d = User.objects.filter(
            is_staff=False, is_superuser=False).exclude()
        serializer_class = UserDetailsSerializer(user_d, many=True)
        return Response(serializer_class.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(CustomUsersListAPIView, self).dispatch(*args, **kwargs)


# Mfi | User details APIView
class CustomUserDetailsView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsOwner | IsSuperUser]
    serializer_class = UserDetailsSerializer

    # retrieve mfi user details
    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # update mfi user details
    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            request.user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


# create mfi address for address
class MfiAddressView(APIView):
    permission_classes = [
        permissions.IsAuthenticated | SuperUserPermission]

    def post(self, request):
        serializer = MfiAddressSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)
        return Response(status=status.HTTP_201_CREATED)

    # mfi address view with cache
    def get(self, request):
        addresses = MfiAddress.objects.filter(owner=self.request.user)
        serializer = MfiAddressSerializer(addresses, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(MfiAddressView, self).dispatch(*args, **kwargs)


# Retrieve, update or delete a mfi address instance.
class MfiAddressDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = MfiAddress.objects.all()
    serializer_class = MfiAddressSerializer


# create part for stakeholder
class MfiStakeholderAPIView(APIView):
    permission_classes = [
        permissions.IsAuthenticated | permissions.IsAdminUser]

    def post(self, request):
        serializer = MfiStakeholderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)
        return Response(status=status.HTTP_201_CREATED)

    # mfi stakeholder view with cache
    def get(self, request):
        stakeholders = MfiStakeholder.objects.filter(owner=self.request.user)
        serializer = MfiStakeholderSerializer(stakeholders, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(MfiStakeholderAPIView, self).dispatch(*args, **kwargs)


# Retrieve, update or delete an instance.
class MfiStakeholderDetailsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = MfiStakeholder.objects.all()
    serializer_class = MfiStakeholderSerializer


# create board for mfi
class MfiBoardView(APIView):
    permission_classes = [
        permissions.IsAuthenticated | permissions.IsAdminUser]

    def post(self, request):
        serializer = MfiBoardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)
        return Response(status=status.HTTP_201_CREATED)

    # mfi board view with cache
    def get(self, request):
        board = MfiBoard.objects.filter(owner=self.request.user)
        serializer = MfiBoardSerializer(board, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(MfiBoardView, self).dispatch(*args, **kwargs)


# Retrieve, update or delete a board member instance.
class MfiBoardDetailsView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = MfiBoard.objects.all()
    serializer_class = MfiBoardSerializer


# create mfi report view
class MfiReportView(APIView):
    permission_classes = [
        permissions.IsAuthenticated | permissions.IsAdminUser]

    def post(self, request):
        serializer = MfiReportSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)
        return Response(status=status.HTTP_201_CREATED)

    # mfi report view with cache
    def get(self, request):
        reports = MfiReport.objects.filter(owner=self.request.user)
        serializer = MfiReportSerializer(reports, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(MfiReportView, self).dispatch(*args, **kwargs)


# Retrieve, update or delete a mfi report instance.
class MfiReportDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = MfiReport.objects.all()
    serializer_class = MfiReportSerializer


# create mfi feedback view
class MfiFeedbackView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = MfiFeedbackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)
        return Response(status=status.HTTP_201_CREATED)

    # mfi feedback view with cache
    def get(self, request):
        feedback = MfiFeedback.objects.all()
        serializer = MfiFeedbackSerializer(feedback, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(MfiFeedbackView, self).dispatch(*args, **kwargs)


# create user feedback view
class UserFeedbackView(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = UserFeedback.objects.all()
    serializer_class = UserFeedbackSerializer

    def post(self, request, **kwargs):
        serializer_class = UserFeedbackSerializer(data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

    # User feedback list with cache
    def get(self, request, **kwargs):
        feedback = UserFeedback.objects.all()
        serializer = UserFeedbackSerializer(feedback, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(UserFeedbackView, self).dispatch(*args, **kwargs)


# Retrieve, update or delete a user feedback instance.
class UserFeedbackDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = UserFeedback.objects.all()
    serializer_class = UserFeedbackSerializer


# create admin feedback view
class AdminFeedbackView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        permission_classes = [permissions.IsAdminUser]
        serializer = AdminFeedbackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)
        return Response(status=status.HTTP_201_CREATED)

    # admin feedback view with cache
    def get(self, request, **kwargs):
        admin_f = AdminFeedback.objects.all()
        serializer = AdminFeedbackSerializer(admin_f, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(AdminFeedbackView, self).dispatch(*args, **kwargs)


# Retrieve, update or delete a admin feedback instance.
class AdminFeedbackDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = AdminFeedback.objects.all()
    serializer_class = AdminFeedbackSerializer


# Prediction view for input data
class PredictionAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            report_assets = request.data.get('report_assets', None)
            report_liability = request.data.get('report_liability', None)
            report_revenue = request.data.get('report_revenue', None)
            report_income = request.data.get('report_income', None)

            fields = [report_assets, report_liability,
                      report_revenue, report_income]

            if not None in fields:
                # Datapreprocessing Convert the values to float
                report_assets = float(report_assets)
                report_liability = float(report_liability)
                report_revenue = float(report_revenue)
                report_income = float(report_income)

                result = [report_assets, report_liability,
                          report_revenue, report_income]
                # print("The result of input ", result)

                classifier = InstitutionConfig.classifier

                prediction = classifier.predict([result])[0]
                conf_score = np.max(classifier.predict_proba([result])) * 100
                predictions = {
                    'report_assets': report_assets,
                    'report_liability': report_liability,
                    'report_revenue': report_revenue,
                    'report_income': report_income,
                    'error': '0',
                    'message': 'Successful',
                    'prediction': prediction,
                    'confidence_score': conf_score
                }
            else:
                predictions = {
                    'error': '1',
                    'message': 'Invalid Parameters'
                }
        except Exception as e:
            predictions = {
                'error': '2',
                "message": str(e)
            }

        serializer = IncomePredictionSerializer(data=predictions)
        if serializer.is_valid(raise_exception=True):
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, **kwargs):
        predicts = IncomePrediction.objects.all()
        serializer = IncomePredictionSerializer(predicts, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(PredictionAPIView, self).dispatch(*args, **kwargs)


#  A view that returns the count of active Institutions.
class UserTotalCountView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = AdminFeedbackSerializer

    def get(self):
        total = User.objects.count()
        content = ['total', total]
        return Response(content)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(UserTotalCountView, self).dispatch(*args, **kwargs)


# A view for counting list of institution types
class UserTypeCountView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self):
        category = User.objects.all().values('mfi_type').order_by('mfi_type'). \
            annotate(type=Count('mfi_type'))
        content = [category]
        return Response(content)

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(UserTypeCountView, self).dispatch(*args, **kwargs)


# User logout APIView
class LogoutAndBlacklistAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    # logout and black listing token
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
