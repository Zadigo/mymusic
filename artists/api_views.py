from artists import models
from rest_framework.exceptions import NotAcceptable
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view

from artists import serializers as artists_serializers
from artists.models import Album, Artist, Song
from artists.serializers import ArtistSerializer2, SearchValidator
from mymusic.utils import create_response, map_list


@api_view(['post'])
def artist_details_view(request, reference):
    """Return the detail of a given artist"""
    artist = get_object_or_404(Artist, id=reference)
    # TODO: Include if the user follows the artist
    # follows_artist = artist.followers.contains(request.user)
    # print(follows_artist)

    serializer = ArtistSerializer2(instance=artist)
    return create_response(serializer=serializer)


@api_view(['post'])
def search_albums_view(request, **kwargs):
    """Search all albums on the website"""
    serializer = SearchValidator(data=request.data)
    serializer.is_valid(raise_exception=True)
    results_serializer = serializer.search()
    return create_response(serializer=results_serializer)


# @api_view(['get'])
# def albums_view(request, **kwargs):
#     queryset = cache.get('albums')
#     if not queryset:
#         queryset = Album.objects.prefetch_related('song_set')
#         cache.set('albums', queryset, 3600)
#     serializer = AlbumSerializer(instance=queryset, many=True)
#     return create_response(serializer=serializer)


@api_view(['get'])
def genres_view(request, **kwargs):
    """Return all available genre on
    the plateform"""
    genres = cache.get('genres', [])
    if not genres:
        genres = Album.objects.genres()
        genres = list(map_list(genres))
        cache.set('genres', genres, 0)
    return create_response(data=genres)


@api_view(['get'])
def followed_artists_view(request, **kwargs):
    """Returns the artists that the user follows"""
    artists = Artist.objects.filter(
        followers__id=1
    ).order_by('name')
    serializer = artists_serializers.SimpleArtistSerializer(
        instance=artists,
        many=True
    )
    return create_response(serializer=serializer)


@api_view(['post'])
def follow_artist_view(request, pk, **kwargs):
    """Follow an artist"""
    artist = get_object_or_404(Artist, pk=pk)
    artist.followers.add(request.user)
    return create_response(data={'state': True})


@api_view(['post'])
def unfollow_artist_view(request, pk, **kwargs):
    """Follow an artist"""
    artist = get_object_or_404(Artist, pk=pk)
    artist.followers.remove(request.user)
    return create_response(data={'state': True})


def load_chart_from_cache(name, model_if_none):
    result = cache.get(name, [])
    if not result:
        result = model_if_none.objects.all()
        cache.set(name, result, 24 * 60)
    return result


@api_view(['post'])
def charts_view(request, **kwargs):
    """Follow an artist"""
    chart_types = ['Songs', 'Albums', 'Singles']
    chart_type = request.data.get('chart_type', None)

    if chart_type not in chart_types:
        raise NotAcceptable('Chart is not defined')

    # TODO: Return only the first 100 values
    if chart_type == 'Songs':
        queryset = load_chart_from_cache('chart_songs_queryset', Song)
        queryset = queryset.annotate(
            listeners=models.Count('listener__id')
        )
        queryset = queryset.exclude(listeners=0)
        queryset = queryset.order_by('-listeners')
    elif chart_type == 'Albums':
        # queryset = load_chart_from_cache('chart_albums_queryset', Album)
        # cache.set('chart_albums_queryset', queryset, 24 * 60)
        queryset = []
    elif chart_type == 'Singles':
        # queryset = load_chart_from_cache('chart_singles_queryset', Song)
        # cache.set('chart_singles_queryset', queryset, 24 * 60)
        queryset = []
    serializer = artists_serializers.ChartSerializer(
        instance=queryset,
        many=True
    )
    return create_response(serializer=serializer)
