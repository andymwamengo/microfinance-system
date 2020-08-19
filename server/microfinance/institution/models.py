"""
Microfinance Application Models which exposes features of
the API Also extending django rest Auth
"""

from django.conf import settings
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager

# User | institutions Choices
type_of = (
    ('admin', 'admin'),
    ('bank', 'bank'),
    ('private', 'private'),
    ('saccoss', 'saccoss'),
    ('vicoba', 'vicoba'),
)


# Custom User | institutions model
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    mfi_type = models.CharField(_('mfi type'), choices=type_of, max_length=20, null=False, blank=False)
    mfi_name = models.CharField(_('mfi name'), max_length=30, null=False, blank=False)
    mfi_license = models.CharField(_('mfi license'), max_length=30, null=False, blank=False)
    mfi_service = models.CharField(_('mfi service'), max_length=200, null=False, blank=False)
    mfi_assets = models.CharField(_('mfi assets'), max_length=30, null=False, blank=False)
    mfi_liability = models.CharField(_('mfi liability'), max_length=200, null=False, blank=False)
    mfi_technology = models.CharField(_('mfi technology'), max_length=200, null=False, blank=False)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['mfi_type', 'mfi_name', 'mfi_license', 'mfi_service',
                       'mfi_assets', 'mfi_liability', 'mfi_technology', ]

    class Meta:
        verbose_name = _('institutions')
        verbose_name_plural = _('institutions')
        db_table = "institutions"

    def get_full_name(self):
        full_name = '%s %s' % (self.mfi_name, self.mfi_license)
        return full_name.strip()

    def get_short_name(self):
        return self.mfi_name


# Stakeholder model
class MfiStakeholder(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='mfi_stakeholder', on_delete=models.CASCADE)
    stake_first_name = models.CharField(_('stakeholder first name'), max_length=30, null=False, blank=False)
    stake_middle_name = models.CharField(_('stakeholder middle name'), max_length=30, null=True, blank=True)
    stake_last_name = models.CharField(_('stakeholder last name'), max_length=30, null=False, blank=False)
    stake_email = models.EmailField(_('stakeholder email'), max_length=30, null=True, blank=True)
    stake_phone_number = models.CharField(_('stakeholder phone number'), max_length=30, null=True, blank=True)
    stake_citizenship = models.CharField(_('stakeholder citizenship'), max_length=30, null=False, blank=False)
    stake_share = models.CharField(_('stakeholder share'), max_length=30, null=False, blank=False)
    stake_avatar = models.ImageField(_('stakeholder avatar'), null=True, blank=True)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)

    class Meta:
        verbose_name = _('institutions_stakeholder')
        verbose_name_plural = _('institutions_stakeholders')
        db_table = "institutions_stakeholders"


# Board Model model
class MfiBoard(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='mfi_board', on_delete=models.CASCADE)
    board_first_name = models.CharField(_('board first name'), max_length=30, null=False, blank=False)
    board_middle_name = models.CharField(_('board middle name'), max_length=30, null=True, blank=True)
    board_last_name = models.CharField(_('board last name'), max_length=30, null=False, blank=False)
    board_email = models.EmailField(_('board email'), max_length=30, null=True, blank=True)
    board_phone_number = models.CharField(_('board phone number'), max_length=30, null=True, blank=True)
    board_citizenship = models.CharField(_('board citizenship'), max_length=30, null=False, blank=False)
    board_position = models.CharField(_('board position'), max_length=30, null=False, blank=False)
    board_avatar = models.ImageField(_('board avatar'), null=True, blank=True)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)

    class Meta:
        verbose_name = _('institutions_board')
        verbose_name_plural = _('institutions_board')
        db_table = "institutions_board_members"


# Address model
class MfiAddress(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='mfi_address', on_delete=models.CASCADE)
    address_office = models.CharField(_('address office'), max_length=30, null=False, blank=False)
    address_phone_number = models.CharField(_('address phone number'), max_length=30, null=True, blank=True)
    address_website = models.URLField(_('address website'), max_length=30, null=True, blank=True)
    address_pobox = models.CharField(_('address pobox'), max_length=30, null=True, blank=True)
    address_district = models.CharField(_('address district'), max_length=30, null=False, blank=False)
    address_region = models.CharField(_('address region'), max_length=30, null=False, blank=False)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)

    class Meta:
        verbose_name = _('institutions_address')
        verbose_name_plural = _('institutions_address')
        db_table = "institutions_address"


# Report model
class MfiReport(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='mfi_report', on_delete=models.CASCADE)
    report_assets = models.CharField(_('report assets'), max_length=30, null=False, blank=False)
    report_liability = models.CharField(_('report liability'), max_length=30, null=False, blank=False)
    report_revenue = models.CharField(_('report revenue'), max_length=30, null=False, blank=False)
    report_income = models.CharField(_('report income'), max_length=30, null=False, blank=False)
    report_dividend = models.CharField(_('report dividend'), max_length=30, null=True, blank=True, default=0)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)

    class Meta:
        verbose_name = _('institutions_report')
        verbose_name_plural = _('institutions_report')
        db_table = "institutions_reports"


# User feedback model
class UserFeedback(models.Model):
    user_email = models.EmailField(_('user email'), max_length=30, null=True, blank=True)
    user_first_name = models.CharField(_('user first name'), max_length=30, null=False, blank=False)
    user_last_name = models.CharField(_('user last name'), max_length=30, null=False, blank=False)
    user_feedback = models.TextField(_('user feedback'), null=False, blank=False)
    date_submitted = models.DateTimeField(_('date joined'), auto_now_add=True)

    class Meta:
        verbose_name = _('users_feedback')
        verbose_name_plural = _('users_feedback')
        db_table = "users_feedback"


# Admin feedback model
class AdminFeedback(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='admin_feedback', on_delete=models.CASCADE)
    admin_feedback = models.TextField(_('admin feedback'), null=False, blank=False)
    date_submitted = models.DateTimeField(_('date joined'), auto_now_add=True)

    class Meta:
        verbose_name = _('admin_feedback')
        verbose_name_plural = _('admin_feedback')
        db_table = "admin_feedback"


class MfiFeedback(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='mfi_feedback', on_delete=models.CASCADE)
    title = models.TextField(_('mfi feedback'), null=False, blank=False)
    content = models.TextField(_('mfi feedback'), null=False, blank=False)
    date_submitted = models.DateTimeField(_('date submitted'), auto_now_add=True)

    class Meta:
        verbose_name = _('institutions_feedback')
        verbose_name_plural = _('institutions_feedback')
        db_table = "institutions_feedback"


class IncomePrediction(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='mfi_predicts', on_delete=models.CASCADE)
    report_assets = models.CharField(_('report assets'), max_length=30, null=False, blank=False)
    report_liability = models.CharField(_('report liability'), max_length=30, null=False, blank=False)
    report_revenue = models.CharField(_('report revenue'), max_length=30, null=False, blank=False)
    report_income = models.CharField(_('report income'), max_length=30, null=False, blank=False)
    report_dividend = models.CharField(_('report dividend'), max_length=30, null=True, blank=True)

    error = models.CharField(max_length=100, null=False, blank=False)
    message = models.CharField(max_length=100, null=False, blank=False)
    prediction = models.CharField(max_length=10, null=False, blank=False)
    confidence_score = models.CharField(max_length=10, null=False, blank=False)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('institutions_predictions')
        verbose_name_plural = _('institutions_predictions')
        db_table = "institutions_predictions"

# New Features can be added bellow
# Thanks in advance
