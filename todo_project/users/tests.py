from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserModelViewSet
from .models import User
from todo.models import Project


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.format = 'json'
        self.users_dict = {'username': 'Olga Skabeeva', 'email': 'sobakaSutulaya@localhost.ru'}


    def test_create_new_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', self.users_dict, format=self.format)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_project_edit_admin(self):
        project = Project.objects.create(name='Fake_project', repo_link='fake1@pochta.ru')
        client = APIClient()
        admin = User.objects.create_superuser('admin2', 'admin@admin.com', '456')
        client.login(username='admin2', password='456')
        response = client.patch(f'/api/projects/{project.id}/', {'name': 'Fake_2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()


class TestProjectViewSet(APITestCase):
    def test_get_list(self):
        user = User.objects.create_user('user7', 'user7@users.com', '777')
        project = Project.objects.create(name='Fake_project', repo_link='fake1@pochta.ru')
        self.client.login(username='user7', password='777')
        response = self.client.get('/api/projects/')
        print(response.json())
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_mixer(self):
        project = mixer.blend(Project, users__id='2')
        admin = User.objects.create_superuser('admin2', 'admin@admin.com', '456')
        self.client.login(username='admin2', password='456')
        response = self.client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_project = json.loads(response.content)
        print(response_project)
        self.assertEqual(response_project['users'], [2])


    def tearDown(self) -> None:
        pass

