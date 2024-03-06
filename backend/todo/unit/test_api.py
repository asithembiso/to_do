import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from todo.models import ToDo

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def test_user(db):
    return User.objects.create_user(username='testuser', password='12345')

@pytest.fixture
def create_todo(db, test_user):
    return ToDo.objects.create(title='Test ToDo', description='Test Description', user=test_user)
    
@pytest.mark.django_db
def test_create_todo(api_client, test_user):
    api_client.force_authenticate(user=test_user)
    url = reverse('todo-list')
    data = {'title': 'New ToDo', 'description': 'A new task', 'user': test_user.id}
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert ToDo.objects.count() == 1
    assert ToDo.objects.first().title == 'New ToDo'

@pytest.mark.django_db
def test_create_todo_missing_title(api_client, test_user):
    api_client.force_authenticate(user=test_user)
    url = reverse('todo-list')
    data = {'description': 'A new task without a title', 'user': test_user.id}
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_get_todo_detail_positive(api_client, test_user, create_todo):
    api_client.force_authenticate(user=test_user)
    todo = create_todo
    url = reverse('todo-detail', args=[todo.id])
    response = api_client.get(url, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert response.data['title'] == todo.title
