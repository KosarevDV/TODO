from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, generics
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerVersion2


class UserModelViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    # renderer_classes = [JSONRenderer]
    #
    # def get(self, request):
    #     queryset = User.objects.all()
    #     serializer = UserModelSerializer()
    #     return Response(serializer.data)
    #
    # def list(self, request, queryset):
    #     serializer = UserModelSerializer(queryset, many=True)
    #     return Response(serializer.data)
    #
    # def retreive(self, request, pk=None):
    #     queryset = get_object_or_404(User, pk=pk)
    #     serializer = UserModelSerializer(queryset, many=True)
    #     return Response(serializer.data)


class UserApiView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerVersion2
        return UserModelSerializer
