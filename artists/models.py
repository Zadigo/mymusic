from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Count, Index, UniqueConstraint
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.functional import cached_property
from django.utils.timezone import make_aware, now
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from mutagen import id3
from mutagen.mp3 import MP3

from artists.choices import Genres, GeographicAreas, Nationalities
from artists.managers import AlbumManager, ListenerManager, SongManager
from artists.utils import artist_cover_image_path, cover_image_path, song_path
from artists.validators import song_file_validator, validate_date_of_birth

USER_MODEL = get_user_model()


class Artist(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        blank=False,
        null=False
    )
    fullname = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )
    presentation = models.TextField(
        max_length=1000,
        blank=True,
        null=True
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
        validators=[validate_date_of_birth],
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
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE
    )
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
    producer = models.CharField(max_length=100)
    # number_of_plays = models.PositiveIntegerField(default=0)
    
    is_single = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    release_date = models.DateField(default=now)
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
    
    @property
    def release_year(self):
        return self.release_date.year

    @cached_property
    def listening_total_time(self):
        return self.song_set.aggregate(Count('duration'))['duration__count']


class Song(models.Model):
    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE
    )
    name = models.CharField(
        max_length=100,
        help_text='Song name'
    )
    song_file = models.FileField(
        upload_to=song_path,
        validators=[song_file_validator]
    )
    genre = models.CharField(
        max_length=100,
        choices=Genres.choices,
        default=Genres.DANCEHALL
    )
    featuring_artists = models.ManyToManyField(
        Artist,
        blank=True,
        help_text='Artists who have featured in the song'
    )
    duration = models.FloatField(
        default=0,
        help_text='Duration in seconds'
    )
    bitrate = models.PositiveIntegerField(default=0)
    is_explicit = models.BooleanField(default=False)
    added_on = models.DateField(auto_now_add=True)

    objects = SongManager()

    class Meta:
        ordering = ['name']
        indexes = [
            Index(fields=['name', 'genre', 'album'])
        ]
        # constraints = [
        #     UniqueConstraint(fields=['name', 'album'], name='unique_song_per_album')
        # ]

    def __str__(self):
        return self.name

    @cached_property
    def fomatted_duration(self):
        return round(self.duration / 60, 3)


class Listener(models.Model):
    """Creates record for when a user has 
    listened to a given track for at 
    least 30 or more seconds"""
    user = models.ForeignKey(
        USER_MODEL,
        on_delete=models.SET_NULL,
        null=True
    )
    song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE
    )
    was_seeked = models.BooleanField(default=False)
    seek_time = models.PositiveIntegerField(default=0)
    created_on = models.DateTimeField(auto_now=True)

    objects = ListenerManager()

    def __str__(self):
        return str(self.song)


@receiver(post_save, sender=Song)
def create_file_metadata(instance, created, **kwargs):
    if created:
        if instance.song_file.path is not None:
            mp3_file = MP3(instance.song_file.path)
            
            instance.bitrate = mp3_file.info.bitrate
            # duration_in_minutes = mp3_file.info.length / 60
            # instance.duration = duration_in_minutes
            instance.duration = round(mp3_file.info.length, 5)
            instance.save()



# @receiver(post_save, sender=Song)
# def song_file_metadata(instance, created, **kwargs):
#     # https://mutagen.readthedocs.io/en/latest/user/filelike.html
#     # https://code.activestate.com/recipes/577138-embed-lyrics-into-mp3-files-using-mutagen-uslt-tag/
#     # https://stackoverflow.com/questions/59993139/how-to-add-syltsynced-lyrics-tag-on-id3v2-mp3-file-using-python
#     # https://id3.org/id3v2.3.0#Synchronised_lyrics.2Ftext
#     if created:
#         file = MP3(instance.song_file.path)

#         try:
#             tags = id3.ID3(file)
#         except id3.ID3NoHeaderError:
#             tags = id3.ID3()
#         else:
#             lyrics = tags.getall(u"USLT::'en'")
#             if len(lyrics) != 0:
#                 tags.delall(u"USLT::'en'")
#                 tags.save()

#             tags[u"SYLT::'en'"] = id3.SYLT(
#                 encoding=3, 
#                 lang=u'eng',
#                 desc=u'desc', 
#                 text=''
#             )

#             tags['TIT2'] = id3.TIT2(encoding=3, text=instance.name)
#             tags['TALB'] = id3.TALB(encoding=3, text=instance.album.name)
#             tags['TPE1'] = id3.TPE1(encoding=3, text=instance.album.artist.name)
#             tags['TCON'] = id3.TCON(encoding=3, genres=[])
#             tags['TPRO'] = id3.TPRO(encoding=3, text=instance.album.producer)

#             tags.save(instance.song_file.path)
