from rest_framework.serializers import HyperlinkedModelSerializer
from todo.models import Project, TODO


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'repo_link', 'users']
#        lookup_field = 'name'

class TODOModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
