from artists.models import Song
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from mymusic.utils import dominant_image_color

from playlists.choices import UserCustomsort
from playlists.utils import playlists_cover_image_path

USER_MODEL = get_user_model()

class AbstractPlaylist(models.Model):
    author = models.ForeignKey(
        USER_MODEL,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    songs = models.ManyToManyField(Song, blank=True)
    cover_image = ProcessedImageField(
        format='JPEG',
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
        return self.name
    
    # def clean(self):
    #     if self.background_color is None:
    #         self.background_color = dominant_image_color(self.cover_image)


class UserPlaylist(AbstractPlaylist):
    user_sort = models.CharField(
        max_length=50,
        choices=UserCustomsort.choices,
        default=UserCustomsort.ALBUM_NAME
    )



@receiver(post_save, sender=UserPlaylist)
def get_most_common_color(instance, **kwargs):
    instance.background_color = dominant_image_color(instance.cover_image)
    # instance.save()
