from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import renderer_classes, api_view
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(viewsets.ViewSet):
    renderer_classes = [JSONRenderer]

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserModelSerializer()
        return Response(serializer.data)

    def retreive(self, request, pk=None):
        queryset = get_object_or_404(User, pk=pk)
        serializer = UserModelSerializer()
        return Response(serializer.data)

# @api_view(['LIST', 'RETRIEVE'])
# @renderer_classes([JSONRenderer])
# def user_view(request):
#     users = User.objects.all()
#     serializer = UserModelSerializer(users, many=True)
#     return Response(serializer.data)
