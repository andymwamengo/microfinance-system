"""
The institution urls settings to expose different endpoints
"""

from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from .views import (CustomUserCreateView, CustomUserDetailsView, CustomTokenObtainPairView,
                    CustomUsersListAPIView, MfiStakeholderAPIView, MfiStakeholderDetailsView,
                    MfiBoardView, MfiBoardDetailsView, MfiAddressView,
                    MfiAddressDetailView, MfiReportView,
                    MfiReportDetailView, UserFeedbackView,
                    UserFeedbackDetailView, AdminFeedbackView,
                    AdminFeedbackDetailView, LogoutAndBlacklistAPIView,
                    MfiFeedbackView, PredictionAPIView,
                    UserTotalCountView, UserTypeCountView)

# Urlpatterns list for the app
app_name = 'institution'
urlpatterns = [
                  # Auth urls
                  url(r'^auth/login/?$', CustomTokenObtainPairView.as_view(),
                      name='obtain_token'),
                  url(r'^token/refresh/?$', TokenRefreshView.as_view(),
                      name='token_refresh'),
                  url(r'^token/verify/?$', TokenVerifyView.as_view(),
                      name='token_verify'),

                  # Mfi as user Create | Read | Update | Delete url
                  url(r'^user/register/?$',
                      CustomUserCreateView.as_view(), name='registration'),
                  url(r'^user/(?P<pk>\d+)/?$',
                      CustomUserDetailsView.as_view(), name='user_details'),
                  url(r'^user/list/?$', CustomUsersListAPIView.as_view(),
                      name='list_all_mfi'),

                  # Stakeholder Create | Read | Update | Delete url
                  url(r'^stakeholder/register/?$', MfiStakeholderAPIView.as_view(),
                      name='register_stakeholder'),
                  url(r'^stakeholder/(?P<pk>\d+)/?$',
                      MfiStakeholderDetailsView.as_view(), name='stakeholder'),

                  # Board Create | Read | Update | Delete url
                  url(r'^board/register/?$', MfiBoardView.as_view(),
                      name='board_register'),
                  url(r'^board/(?P<pk>\d+)/?$',
                      MfiBoardDetailsView.as_view(), name='board_details'),

                  # Address Create | Read | Update | Delete url
                  url(r'^address/register/?$', MfiAddressView.as_view(),
                      name='address_register'),
                  url(r'^address/(?P<pk>\d+)/?$',
                      MfiAddressDetailView.as_view(), name='update'),

                  # Report Create | Read | Update | Delete url
                  url(r'^mfi/report/register/?$',
                      MfiReportView.as_view(), name='address_register'),
                  url(r'^mfi/report/(?P<pk>\d+)/?$',
                      MfiReportDetailView.as_view(), name='update'),

                  # User Feedback Create | Read | Update | Delete url
                  url(r'^user/feedback/?$',
                      UserFeedbackView.as_view(), name='list_all_mfi'),
                  url(r'^user/feedback/(?P<pk>\d+)/?$',
                      UserFeedbackDetailView.as_view(), name='update'),

                  # Admin Feedback Create | Read | Update | Delete url
                  url(r'^admin/report/send/?$',
                      AdminFeedbackView.as_view(), name='admin_feedback'),
                  url(r'^admin/report/(?P<pk>\d+)/?$',
                      AdminFeedbackDetailView.as_view(), name='update'),

                  # Mfi Feedback Create | Read | Update | Delete url
                  url(r'^mfi/feedback/?$', MfiFeedbackView.as_view(),
                      name='mfi_feedback'),
                  url(r'^mfi/feedback/(?P<pk>\d+)/?$',
                      MfiFeedbackView.as_view(), name='update'),

                  # prediction url for every institution Create | Get
                  url(r'^mfi/predict/?$',
                      PredictionAPIView.as_view(), name='predict'),

                  # Counts used in the backend UserCountView
                  # Get user counts
                  url(r'^mfi/total/?$',
                      UserTotalCountView.as_view(), name='total'),

                  # Get user counts
                  url(r'^mfi/asset-by/?$',
                      UserTypeCountView.as_view(), name='category'),

                  # User Logout url
                  url(r'^auth/logout/?$',
                      LogoutAndBlacklistAPIView.as_view(), name='blacklist'),
                  # Static Files Image serving
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
