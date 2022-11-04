
from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        User.objects.create_superuser("admin", "admin@localhost", "123")
        User.objects.create_user("User1", email='user1@localhost')

