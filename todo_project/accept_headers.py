import requests


headers = {'Accept': 'application/json; version=0.2'}
response = requests.get('http://127.0.0.1:8000/api/todo/')
print(response.json())
response = requests.get('http://127.0.0.1:8000/api/todo/', headers=headers)
print(response.json())
