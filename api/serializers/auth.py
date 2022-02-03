from rest_framework.serializers import Serializer
from rest_framework import fields

class UserSerializer(Serializer):
    id = fields.IntegerField()
    username = fields.CharField()
    