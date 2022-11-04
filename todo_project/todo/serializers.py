from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from todo.models import Project, TODO
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    # users = UserModelSerializer(source='get_user_profiles', many=True)
    class Meta:
        model = Project
        fields = '__all__'
        # fields = ['name', 'repo_link', 'users']
#        lookup_field = 'name'


# class ProjectModelSerializerBase(ModelSerializer):
#     class Meta:
#         model = Project
#         fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    class Meta:
        model = TODO
        fields = '__all__'


class TODOModelSerializerVersion2(ModelSerializer):
    class Meta:
        model = TODO
        exclude = ['created_at', 'updated_at']
