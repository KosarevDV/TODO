from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from todo.models import Project, TODO


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        # fields = ['name', 'repo_link', 'users']
#        lookup_field = 'name'

class TODOModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    class Meta:
        model = TODO
        fields = '__all__'
