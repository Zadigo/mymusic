from typing import OrderedDict

from api.serializers import albums
from api.views import create_response, map_list
from artists.models import Album, Artist, Song
from django.core.cache import cache
from rest_framework.decorators import api_view


@api_view(['get'])
def get_albums(request, **kwargs):
    queryset = cache.get('albums')
    if not queryset:
        queryset = Album.objects.prefetch_related('song_set')
        cache.set('albums', queryset, 3600)
    serializer = albums.AlbumSerializer(instance=queryset, many=True)
    return create_response(serializer=serializer)


@api_view(['post'])
def search_albums(request, **kwargs):
    """Search all albums on the website"""
    search = request.data
    
    # From the post object only retain the valid
    # search criteria just in the case someone
    # places something that is not valid
    valid_search_criteria = ['name', 'area', 'genre']
    items = list(filter(lambda x: x[0] in valid_search_criteria, search.items()))
    items = OrderedDict(items)
    
    queryset = Album.objects.search(**items)
    serializer = albums.AlbumSerializer(instance=queryset, many=True)
    return create_response(serializer=serializer)


@api_view(['get'])
def get_genres(request, **kwargs):
    genres = Album.objects.genres()
    return create_response(data=map_list(genres))
