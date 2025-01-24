from django.db.models import Q, IntegerField
from django.db.models.functions import ExtractYear
from rest_framework import fields
from rest_framework.serializers import Serializer

from artists.models import Song


class NestedArtistSerializer(Serializer):
    id = fields.IntegerField()
    name = fields.CharField()
    fullname = fields.CharField()
    presentation = fields.CharField()
    area = fields.CharField()
    date_of_birth = fields.DateField()
    genre = fields.DateField()
    cover_image = fields.ImageField()
    cover_image_thumbnail = fields.FileField()
    number_of_followers = fields.IntegerField()
    created_on = fields.DateField()


class NestedSongSerializer(Serializer):
    id = fields.IntegerField()
    name = fields.CharField()
    song_file = fields.FileField()
    genre = fields.CharField()
    duration = fields.IntegerField()
    bitrate = fields.IntegerField()
    is_explicit = fields.BooleanField()
    featuring_artists = NestedArtistSerializer(many=True)


class AlbumSerializer(Serializer):
    """For search by albums"""

    id = fields.IntegerField()
    artist = NestedArtistSerializer()
    song_set = NestedSongSerializer(many=True)
    name = fields.CharField()
    genre = fields.CharField()
    cover_image = fields.ImageField()
    cover_image_thumbnail = fields.FileField()
    producer = fields.CharField()
    number_of_songs = fields.IntegerField()
    release_year = fields.IntegerField()
    listening_total_time = fields.IntegerField()
    is_single = fields.BooleanField()
    is_active = fields.BooleanField()
    release_date = fields.DateField()


class SearchFormSerializer(Serializer):
    """Search the database for an element contained
    either in the song name, the album's release year, 
    an artist's name or an album's name"""

    name = fields.CharField()
    area = fields.ListField(required=False, allow_null=True)
    release_year = fields.IntegerField(required=False, allow_null=True)
    genre = fields.CharField(required=False, allow_null=True)

    def search(self):
        """Returns the four first instances of
        a search on a given artist, album or genre"""

        name = self.validated_data['name']
        area = self.validated_data.get('area', [])
        release_year = self.validated_data.get('release_year', None)
        genre = self.validated_data.get('genre', None)

        queryset = Song.objects.filter(
            Q(name__icontains=name) |
            Q(album__name__icontains=name) |
            Q(album__artist__name__icontains=name)
        )

        valid_areas = [value for value in area if value != '']
        if valid_areas:
            queryset = queryset.filter(album__artist__area__in=valid_areas)

        if genre is not None:
            queryset = queryset.filter(genre__iexact=genre)

        if release_year is not None:
            year_queryset = queryset.annotate(album_release_year=ExtractYear(
                'album__release_date',
                output_field=IntegerField())
            )
            queryset = year_queryset.filter(album_release_year=release_year)

        return SongSerializer(instance=queryset[:4], many=True)


class ArtistSerializer(Serializer):
    """Returns pieces of information from
    the given artist with information on
    his albums"""

    id = fields.IntegerField()
    name = fields.CharField()
    album_set = AlbumSerializer(many=True)
    area = fields.CharField()
    date_of_birth = fields.DateField()
    genre = fields.DateField()
    cover_image = fields.ImageField()
    cover_image_thumbnail = fields.FileField()
    number_of_followers = fields.IntegerField()
    created_on = fields.DateField()


class SimpleArtistSerializer(Serializer):
    """Renders minial information about an artist"""
    
    id = fields.IntegerField()
    name = fields.CharField()
    cover_image = fields.ImageField()


class SimpleAlbumSerializer(Serializer):
    """Renders minimal information for
    a given album. Include artist information"""
    
    id = fields.IntegerField()
    artist = SimpleArtistSerializer()
    cover_image = fields.ImageField()
    name = fields.CharField()


class ChartSerializer(Serializer):
    """Renders information for the chart
    view. Includes album information"""

    id = fields.IntegerField()
    name = fields.CharField()
    album = SimpleAlbumSerializer()
    song_file = fields.FileField()
    listeners = fields.IntegerField()


class SongSerializer(Serializer):
    """Serializer that includes album information
    for search (songs information, artists information)"""

    album = AlbumSerializer()
