from operator import ge
from api.views import create_response, map_list
from django.core.cache import cache
from rest_framework.decorators import api_view

from artists.models import Album, Artist
from artists.serializers import AlbumSerializer, ArtistDetailsSerializer, SearchSerializer


@api_view(['post'])
def artist_view(request, reference):
    artist = Artist.objects.filter(name='Jahlys')
    serializer = ArtistDetailsSerializer(instance=artist)
    return create_response(serializer=serializer)


@api_view(['post'])
def search_albums_view(request, **kwargs):
    """Search all albums on the website"""
    serializer = SearchSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    results_serializer = serializer.search()
    return create_response(serializer=results_serializer)


@api_view(['get'])
def albums_view(request, **kwargs):
    queryset = cache.get('albums')
    if not queryset:
        queryset = Album.objects.prefetch_related('song_set')
        cache.set('albums', queryset, 3600)
    serializer = AlbumSerializer(instance=queryset, many=True)
    return create_response(serializer=serializer)


@api_view(['get'])
def genres_view(request, **kwargs):
    genres = cache.get('genres', [])
    if not genres:
        genres = Album.objects.genres()
        genres = list(map_list(genres))
        cache.set('genres', genres, 0)
    return create_response(data=genres)
