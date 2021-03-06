from django.db import models
from django.contrib.auth.models import User

class Imageto3d(models.Model):
    image_name = models.CharField(max_length=255, unique=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.TextField(null=False)
    model_url = models.TextField(null=True)
    web_domain = models.CharField(max_length=1023, null=False)
