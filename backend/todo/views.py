from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters

from .models import ToDo
from .serializers import ToDoSerializer


class ToDoViewSet(viewsets.ModelViewSet):

    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    filter_backend = [
        DjangoFilterBackend, 
        filters.OrderingFilter, 
        filters.SearchFilter
    ]
    filterset_fields = (
        'title',
        'user',
        'done'
    )
    search_fields = ('title')
    ordering_fields = (
        'done', 
        'created_at', 
        'updated_at'
    )
