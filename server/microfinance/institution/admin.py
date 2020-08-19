"""
Institution Admin Panel for registering Application models
Superuser can perform CRUD Operations
"""
from django.contrib import admin

from .models import (User, MfiStakeholder, MfiBoard, MfiAddress, MfiReport,
                     UserFeedback, AdminFeedback, IncomePrediction)

# Registering user models to admin panel
admin.site.register(User)  # User | Institutions
admin.site.register(MfiBoard)  # Board
admin.site.register(MfiAddress)  # Address
admin.site.register(MfiReport)  # Report
admin.site.register(UserFeedback)  # user Feedback
admin.site.register(AdminFeedback)  # Admin Feedback
admin.site.register(MfiStakeholder)  # Stakeholder
admin.site.register(IncomePrediction)  # Income Prediction
