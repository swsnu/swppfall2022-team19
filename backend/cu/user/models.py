from django.db import models


class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)

    # age = models.IntegerField(default=0)
    # gender = models.IntegerField(default=0)
    # taste = models.IntegerField(default=0)
    # question = models.IntegerField(max_length=30)

    loginState = models.BooleanField(default = False)

    def __str__(self):
        return self.username