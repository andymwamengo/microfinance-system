"""
Custom user manager for handling Auth during user creation
while inheriting from django Auth
"""

from django.contrib.auth.models import BaseUserManager


# Custom user Manager
class UserManager(BaseUserManager):
    use_in_migrations = True

    # Create a normal User 
    def create_user(self, mfi_type, mfi_name, mfi_license, mfi_service, mfi_assets,
                    mfi_liability, mfi_technology, email, password=None):
        user = self.model(
            mfi_type=mfi_type,
            mfi_name=mfi_name,
            mfi_license=mfi_license,
            mfi_service=mfi_service,
            mfi_assets=mfi_assets,
            mfi_liability=mfi_liability,
            mfi_technology=mfi_technology,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # Create staff User
    def create_staffuser(self, email, mfi_type, mfi_name, mfi_license, mfi_service,
                         mfi_assets, mfi_liability, mfi_technology, password):
        user = self.create_user(
            email=email,
            mfi_type=mfi_type,
            mfi_name=mfi_name,
            mfi_license=mfi_license,
            mfi_service=mfi_service,
            mfi_assets=mfi_assets,
            mfi_liability=mfi_liability,
            mfi_technology=mfi_technology,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    # Create Superuser
    def create_superuser(self, email, mfi_type, mfi_name, mfi_license, mfi_service,
                         mfi_assets, mfi_liability, mfi_technology, password):
        user = self.create_user(
            email=email,
            mfi_type=mfi_type,
            mfi_name=mfi_name,
            mfi_license=mfi_license,
            mfi_service=mfi_service,
            mfi_assets=mfi_assets,
            mfi_liability=mfi_liability,
            mfi_technology=mfi_technology,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user