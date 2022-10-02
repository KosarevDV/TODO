
from django.core.management.base import BaseCommand
from users.models import User
from todo.models import Project


class Command(BaseCommand):

    def handle(self, *args, **options):
        User.objects.create_superuser("admin", "admin@localhost", "123")
        User.objects.create_user("User4", email='user4@localhost')
        User.objects.create_user("User2", email='user2@localhost')
        Project.objects.create_project(project='First project', user=1, text='Create new project with another user')
