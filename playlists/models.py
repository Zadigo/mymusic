from artists.models import Song
from django.contrib.auth import get_user_model
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill

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


class UserPlaylist(AbstractPlaylist):
    pass
