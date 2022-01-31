from artists.models import Songs
from django.contrib.auth import get_user_model
from django.db import models
from imagekit.models import ProcessedImageField

from playlists.utils import playlists_cover_image_path

USER_MODEL = get_user_model()

class AbstractPlaylist(models.Model):
    author = models.ForeignKey(
        USER_MODEL,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    song = models.ManyToManyField(Songs, blank=True)
    cover_image = ProcessedImageField(
        format='JPEG',
        processors=[],
        options={'quality': 90}
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


class UserPlaylists(AbstractPlaylist):
    pass
