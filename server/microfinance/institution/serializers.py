"""
Serializer classes for handling JSON data Serialization and Desializations
Handling Create | Read | Update | Delete of the API
"""

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework.validators import UniqueValidator

from institution.models import (User, UserFeedback, MfiReport, MfiAddress, MfiBoard,
                                MfiStakeholder, MfiFeedback, AdminFeedback, IcomePrediction)


# Obtain Token Pair Serializer from Simple JWT API
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims to the token
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        return token

# Address serializer for handling Create | Read| Update | Delete operations
class MfiAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = MfiAddress
        fields = ['id', 'address_office', 'addres_phone_number',
                  'address_website', 'address_pobox', 'address_district',
                  'address_region', 'date_joined', 'date_updated', ]


# Stakeholder serializer for handling Create | Read| Update | Delete operations
class MfiStakeholderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MfiStakeholder
        fields = ['id', 'stake_first_name', 'stake_middle_name', 'stake_last_name',
                  'stake_email', 'stake_phone_number', 'stake_citizenship', 'stake_share',
                  'stake_avatar', 'date_joined', 'date_updated', ]


# Board serializer for handling Create | Read| Update | Delete operations
class MfiBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = MfiBoard
        fields = ['id', 'board_first_name', 'board_middle_name', 'board_last_name',
                  'board_email', 'board_phone_number', 'board_citizenship', 'board_position',
                  'board_avatar', 'date_joined', 'date_updated', ]


# Mfi Report serializer for handling Create | Read| Update | Delete operations
class MfiReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = MfiReport
        fields = ['id', 'report_assets', 'report_liability', 'report_revenue',
                  'report_income', 'report_dividend', 'date_joined', 'date_updated', ]


# Mfi Report serializer for handling Create | Read| Update | Delete operations
class MfiFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = MfiFeedback
        fields = ['id', 'title', 'content', 'date_submitted']


# Admin Feedback serializer for handling Create | Read| Update | Delete operations
class AdminFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminFeedback
        fields = ['id', 'admin_feedback', 'date_submitted', ]


# Custom Mfi as user serializer handling Create operation
class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, write_only=True)
    # email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])+

    class Meta:
        model = User
        fields = ['id', 'mfi_type', 'mfi_name', 'mfi_license', 'mfi_service',
                  'mfi_assets', 'mfi_liability', 'mfi_technology', 'email',
                  'date_updated', 'date_joined', 'password']

    # Create method for Mfi
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance


# Income prediction for the microfinance institutions
class IcomePredictionSerializer(serializers.ModelSerializer):

    class Meta:
        model = IcomePrediction
        fields = ['input_age', 'input_fast', 'input_pp', 'input_r', 'input_f', 'input_hbA1c',
                  'error', 'message', 'prediction', 'confidence_score', 'created_date', ]


# Mfi as User details serializer for handling Retrieve | Update | ==> delete in f
class UserDetailsSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(max_length=128, read_only=True)
    mfi_address = MfiAddressSerializer(many=True, read_only=True)
    mfi_stakeholder = MfiStakeholderSerializer(many=True, read_only=True)
    mfi_board = MfiBoardSerializer(many=True, read_only=True)
    mfi_report = MfiReportSerializer(many=True, read_only=True)
    mfi_feedback = MfiFeedbackSerializer(many=True, read_only=True)
    admin_feedback = AdminFeedbackSerializer(many=True, read_only=True)
    mfi_predicts = IcomePredictionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'mfi_type', 'mfi_name', 'mfi_license', 'mfi_service', 'mfi_assets',
                  'mfi_liability', 'mfi_technology', 'email', 'date_updated', 'date_joined',
                  'mfi_address', 'mfi_stakeholder', 'mfi_board', 'mfi_report', 'mfi_feedback',
                  'admin_feedback', 'mfi_predicts', ]

    # mfi update method
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance


# User Feedback serializer for handling Create | Read | Delete operations
class UserFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFeedback
        fields = ['id', 'user_email', 'user_first_name', 'user_last_name',
                  'user_feedback', 'date_submitted', ]
