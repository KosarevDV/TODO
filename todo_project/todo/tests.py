# import json
# from django.test import TestCase
# from rest_framework import status
# from rest_framework.test import APIClient
# from mixer.backend.django import mixer
# from django.contrib.auth.models import User
# from .models import Project
#
#
# class TestUserModelViewSet(TestCase):
#     def test_project_edit_admin(self):
#         project = Project.objects.create(name='Fake_project', repo_link='fakelink@pochta.ru')
#         client = APIClient()
#         admin = User.objects.create_superuser('admin', 'admin@admin.com', '456')
#         self.client.login(username='admin', password='456')
#         response = self.client.put(f'/api/projects/{project.id}/', {'name':'Fake_2', 'repo_link':'fake2@pochta.ru'})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         client.logout()
#
#
#
#     def tearDown(self):
#         pass
