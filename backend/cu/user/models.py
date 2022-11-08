from django.db import models
from django.contrib.auth.models import (AbstractUser)


class User(AbstractUser):
    age = models.IntegerField(default=0)  # default 0, 만약 0으로 계속 남으면 잘못된 입력임
    gender = models.IntegerField(default=0)
    taste = models.CharField(max_length=10, default="")
    question = models.IntegerField(default=0)

    def __str__(self):
        return self.username
