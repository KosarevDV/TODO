from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, TODO
from todo.serializers import ProjectModelSerializer, TODOModelSerializer, TODOModelSerializerVersion2
from .filters import ProjectFilter


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filter_class = ProjectFilter

    # def get_serializer_class(self):
    #     if self.request.method in ['GET']:
    #         return ProjectModelSerializer
    #     return ProjectModelSerializerBase


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_fields = ['project']

    def __delete__(self, request, pk):
        instance = self.get_object(pk=pk)
        instance.is_active = False
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return TODOModelSerializerVersion2
        return TODOModelSerializer
