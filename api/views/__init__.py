from typing import Any, Generator

from rest_framework import status
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer, Serializer


def create_response(data: Any=None, serializer: Serializer=None):
    attrs = {'data': None, 'status': status.HTTP_200_OK}
    if serializer is not None:
        attrs.update(data=serializer.data)
    elif data is not None:
        if isinstance(data, (Generator)):
            data = list(data)
            
        if not isinstance(data, (list, dict)):
            raise ValueError('Data should be a list of a dict')
        
        attrs.update(data=data)
    return Response(**attrs)


def map_list(dataset: list):
    for i, item in enumerate(dataset):
        yield { 'id': i, 'name': item}
