from rest_framework import fields
from rest_framework.serializers import Serializer
from django.db.models import Q

from artists.models import Song


class _ArtistSerializer(Serializer):
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


class _SongSerializer(Serializer):
    id = fields.IntegerField()
    name = fields.CharField()
    song_file = fields.FileField()
    genre = fields.CharField()
    duration = fields.IntegerField()
    bitrate = fields.IntegerField()
    is_explicit = fields.BooleanField()
    featuring_artists = _ArtistSerializer(many=True)


class AlbumSerializer(Serializer):
    """For search by albums"""
    id = fields.IntegerField()
    artist = _ArtistSerializer()
    song_set = _SongSerializer(many=True)
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


class SearchValidator(Serializer):
    name = fields.CharField()
    area = fields.ListField(required=False, allow_null=True)
    year = fields.IntegerField(required=False, allow_null=True)
    genre = fields.CharField(required=False, allow_null=True)

    def search(self):
        name = self.validated_data['name']
        area = self.validated_data.get('area', [])
        year = self.validated_data.get('year', None)
        genre = self.validated_data.get('genre', None)

        queryset = Song.objects.filter(
            Q(name__icontains=name) |
            Q(album__artist__name__icontains=name) |
            Q(album__name__icontains=name)
        )

        valid_areas = [value for value in area if value != '']
        if valid_areas:
            queryset = queryset.filter(album__artist__area__in=valid_areas)

        if genre is not None:
            queryset = queryset.filter(genre__iexact=genre)

        return SongSerializer2(instance=queryset[:4], many=True)


class SongSerializer2(_SongSerializer):
    """For search by songs"""
    album = AlbumSerializer()


class ArtistSerializer2(Serializer):
    """For showing pieces of information
    about a given artist"""

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
