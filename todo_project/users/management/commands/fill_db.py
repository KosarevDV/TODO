
from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        User.objects.create_superuser("admin", "admin@localhost", "123")
        User.objects.create_user("User4", email='user4@localhost')

