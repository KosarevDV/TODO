from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from todo.models import Project, TODO


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'repo_link', 'users']
#        lookup_field = 'name'

class TODOModelSerializer(ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
