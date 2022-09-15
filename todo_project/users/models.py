
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    email = models.EmailField(max_length=254, unique=True)
    # birthday_year = models.PositiveIntegerField()
    # avatar = models.ImageField(verbose_name="аватар", blank=True, upload_to="users")
