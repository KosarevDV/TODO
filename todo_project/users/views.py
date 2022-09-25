from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
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
