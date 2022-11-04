from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    repo_link = models.URLField(max_length=200)
    users = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.name

    # def get_user_profiles(self):
    #     return User.objects.filter(user__post=self)


class TODO(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    user = models.ForeignKey(User, models.PROTECT)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

