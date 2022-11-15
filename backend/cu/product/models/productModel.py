from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length = 100)
    #subscribers = models.ManyToManyField( User, through="user.SubscribeTag", related_name="subscribeTags")


class Product(models.Model):
    name = models.CharField(max_length = 300, blank=False, null=False)
    mainCategory = models.CharField(max_length = 100, blank=False, null=False)
    subCategory = models.CharField(max_length = 300, blank=False, null=False)
    imageUrl = models.URLField(blank = False, null=False)
    details = models.TextField(blank=False, null=False)
    price = models.IntegerField(blank = False, null=False)
    newProduct = models.BooleanField(default = False)
    tags = models.ManyToManyField(Tag, related_name = "products", blank=True)
    averageScore = models.FloatField(default = 0)

    def __str__(self):
        return self.name


