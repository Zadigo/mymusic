from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Count, Index
from django.utils.timezone import make_aware, now
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from mutagen.mp3 import MP3

from artists.choices import Genres, GeographicAreas, Nationalities
from artists.managers import AlbumManager, SongManager
from artists.utils import artist_cover_image_path, cover_image_path, song_path
from artists.validators import song_file_validator

USER_MODEL = get_user_model()


class Artist(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        blank=False,
        null=False
    )
    area = models.CharField(
        max_length=100,
        choices=GeographicAreas.choices,
        default=GeographicAreas.JAMAICA
    )
    nationality = models.CharField(
        max_length=100,
        choices=Nationalities.choices,
        default=Nationalities.JAMAICAN
    )
    date_of_birth = models.DateField(
        default=None,
        blank=True,
        null=True
    )

    genre = models.CharField(
        max_length=100,
        choices=Genres.choices,
        default=Genres.DANCEHALL
    )

    cover_image = models.ImageField(upload_to=artist_cover_image_path)
    cover_image_thumbnail = ImageSpecField(
        source='cover_image',
        processors=[ResizeToFill(width=300, height=300)],
        format='JPEG',
        options={'quality': 90}
    )
    followers = models.ManyToManyField(
        USER_MODEL,
        blank=True
    )

    modified_on = models.DateField(auto_now=True)
    created_on = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        indexes = [
            Index(fields=['name', 'genre'])
        ]

    def __str__(self):
        return self.name

    @property
    def number_of_followers(self):
        return self.followers.all().count()


class Album(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    name = models.CharField(
        max_length=100,
        blank=False,
        null=False
    )
    genre = models.CharField(
        max_length=100,
        choices=Genres.choices,
        default=Genres.DANCEHALL
    )
    cover_image = models.ImageField(upload_to=cover_image_path)
    cover_image_thumbnail = ImageSpecField(
        source='cover_image',
        processors=[ResizeToFill(width=400, height=400)],
        format='JPEG',
        options={'quality': 90}
    )
    is_single = models.BooleanField(default=False)
    number_of_plays = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=True)

    modified_on = models.DateField(auto_now=True)
    created_on = models.DateField(auto_now_add=True)

    objects = AlbumManager()

    class Meta:
        ordering = ['name']
        indexes = [
            Index(fields=['artist', 'name', 'genre'])
        ]

    def __str__(self):
        return self.name

    @property
    def number_of_songs(self):
        return self.song_set.all().aggregate(Count('id'))['id__count']


class Song(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    song_file = models.FileField(
        upload_to=song_path,
        validators=[song_file_validator]
    )
    genre = models.CharField(
        max_length=100,
        choices=Genres.choices,
        default=Genres.DANCEHALL
    )
    duration = models.PositiveIntegerField(default=0)
    bitrate = models.PositiveIntegerField(default=0)
    added_on = models.DateField(auto_now_add=True)

    objects = SongManager()

    class Meta:
        ordering = ['name']
        indexes = [
            Index(fields=['name', 'genre', 'album'])
        ]

    def __str__(self):
        return self.name

    def clean(self):
        if self.song_file.path is not None:
            instance = MP3(self.song_file.path)
            self.bitrate = instance.info.bitrate
            duration_in_minutes = instance.info.length / 60
            self.duration = duration_in_minutes
