import graphene
from graphene_django import DjangoObjectType
from todo.models import Project, TODO
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
    fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = ['id', 'project', 'user', 'text']

class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    projects_by_username = graphene.List(ProjectType, username=graphene.String(required=False))
    todo_by_project = graphene.List(TODOType)


    def resolve_all_projects(root, info):
        return Project.objects.all()


    def resolve_all_users(root, info):
        return User.objects.all()


    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None


    def resolve_project_by_username(root, info, username):
        projects = Project.objects.all()
        if username:
            project = projects.filter(username=username)
        return project


    def resolve_todo_by_project(root, info):
        return TODO.objects.all()


# class UserMutation(graphene.Mutation):
#     class Arguments:
#         id = graphene.ID()
#         firstname = graphene.String(required=True)
#         lastname = graphene.String(required=True)
#         user = graphene.Field(UserType)
#
#     @classmethod
#     def mutate(cls, root, info, firstname, lastname, id):
#         user = User.objects.get(pk=id)
#         user.firstname = firstname
#         user.lastname = lastname
#         user.save()
#         return UserMutation(user=user)
#
#
# class Mutation(graphene.ObjectType):
#     update_user = UserMutation.Field()


schema = graphene.Schema(query=Query)
