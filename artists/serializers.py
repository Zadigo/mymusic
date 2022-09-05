from rest_framework.serializers import Serializer
from rest_framework import fields
from artists.models import Album, Artist, Song
from django.db.models import Q


class ArtistSerializer(Serializer):
    id = fields.IntegerField()
    name = fields.CharField()

    area = fields.CharField()

    date_of_birth = fields.DateField()
    genre = fields.DateField()
    cover_image = fields.ImageField()
    cover_image_thumbnail = fields.FileField()

    number_of_followers = fields.IntegerField()
    created_on = fields.DateField()


class SongSerializer(Serializer):
    id = fields.IntegerField()

    name = fields.CharField()
    song_file = fields.FileField()
    genre = fields.CharField()
    duration = fields.DurationField()
    bitrate = fields.IntegerField()


class AlbumSerializer(Serializer):
    id = fields.IntegerField()

    artist = ArtistSerializer()

    song_set = SongSerializer(many=True)

    name = fields.CharField()
    genre = fields.CharField()

    cover_image = fields.ImageField()
    cover_image_thumbnail = fields.FileField()

    is_single = fields.BooleanField()
    number_of_plays = fields.IntegerField()
    number_of_songs = fields.IntegerField()

    active = fields.BooleanField()
    created_on = fields.DateField()


class ArtistDetailsSerializer(Serializer):
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


class SongSerializer2(SongSerializer):
    album = AlbumSerializer()


class SearchSerializer(Serializer):
    name = fields.CharField()
    area = fields.ListField(required=False, allow_null=True)
    year = fields.IntegerField(required=False, allow_null=True)
    genre = fields.CharField(required=False, allow_null=True)

    def search(self):
        name = self.validated_data['name']
        area = self.validated_data.get('area', [])
        year = self.validated_data.get('year', None)
        genre = self.validated_data.get('genre', None)

        queryset = Song.objects.filter(album__artist__name__icontains=name)

        if area:
            queryset = queryset.filter(area__in=area)

        if genre is not None:
            queryset = queryset.filter(genre__iexact=genre)

        return SongSerializer2(instance=queryset[:4], many=True)
