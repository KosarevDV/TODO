from rest_framework.serializers import ModelSerializer
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']


class UserModelSerializerVersion2(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'firstname', 'lastname', 'email', 'is_superuser', 'is_staff']
