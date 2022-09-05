from rest_framework.serializers import Serializer
from rest_framework import fields
from artists.models import Artist
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

    # artist = ArtistSerializer()

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


class SearchSerializer(Serializer):
    name = fields.CharField(allow_null=True)
    area = fields.ListField()
    genre = fields.CharField(allow_null=True)

    def search(self):
        if self.validated_data['name']:
            queryset = Artist.objects.filter(
                name__icontains=self.validated_data['name'])
        else:
            queryset = Artist.objects.all()

        if self.validated_data['area']:
            queryset = queryset.filter(area__in=self.validated_data['area'])

        if self.validated_data['genre']:
            queryset = queryset.filter(
                genre__iexact=self.validated_data['genre'])
        return ArtistDetailsSerializer(instance=queryset[:4], many=True)
