from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Count
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.functional import cached_property
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

from artists.models import Song
from mymusic.utils import dominant_image_color
from playlists.choices import UserCustomSort
from playlists.utils import playlists_cover_image_path

USER_MODEL = get_user_model()


class AbstractPlaylist(models.Model):
    """Represents a basic playlist"""

    author = models.ForeignKey(
        USER_MODEL,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    songs = models.ManyToManyField(
        Song,
        blank=True
    )
    cover_image = ProcessedImageField(
        format='JPEG',
        upload_to=playlists_cover_image_path,
        processors=[ResizeToFill(width=300, height=300)],
        options={'quality': 90},
        blank=True,
        null=True
    )
    background_color = models.CharField(
        max_length=30,
        blank=True,
        null=True,
        help_text='Background color for the playlist in hexadecimal'
    )
    followers = models.ManyToManyField(
        USER_MODEL,
        blank=True,
        related_name='playlist_followers'
    )
    created_on = models.DateField(auto_now_add=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f'Playlist: {self.name}'

    @cached_property
    def number_of_followers(self):
        return self.followers.count()

    @cached_property
    def number_of_songs(self):
        return self.songs.count()

    @cached_property
    def listening_total_time(self):
        return self.songs.aggregate(Count('duration'))


class UserPlaylist(AbstractPlaylist):
    """Playlist created by the user"""
    
    user_sort = models.CharField(
        max_length=50,
        help_text='The sorting mechanism chosen by the user',
        choices=UserCustomSort.choices,
        default=UserCustomSort.ALBUM_NAME
    )
    followers = models.ManyToManyField(
        USER_MODEL,
        blank=True,
        related_name='user_playlist_followers'
    )


class OfficialPlaylist(AbstractPlaylist):
    """Playlist created by us"""
    author = None
    followers = models.ManyToManyField(
        USER_MODEL,
        blank=True,
        related_name='official_playlist_followers'
    )


@receiver(post_save, sender=UserPlaylist)
def get_playlist_most_common_color(instance, created, **kwargs):
    """Return the dominant color from an image"""
    if created:
        instance.background_color = dominant_image_color(instance.cover_image)
        instance.save()


@receiver(post_save, sender=OfficialPlaylist)
def get_officialplaylist_most_common_color(instance, created, **kwargs):
    if created:
        instance.background_color = dominant_image_color(instance.cover_image)
        instance.save()
