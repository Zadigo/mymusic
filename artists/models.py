from django.db import models
from django.utils.timezone import make_aware, now
from imagekit.models import ImageSpecField

from artists.choices import Genres, GeographicAreas, Nationalities
from artists.utils import artist_cover_image_path, upload_cover_image_path
from artists.validators import song_file_validator

class Artists(models.Model):
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
        processors=[],
        format='JPEG',
        options={'quality': 90}
    )
    
    modified_on = models.DateField(auto_now=True)
    created_on = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Albums(models.Model):
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE)
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
    cover_image = models.ImageField(upload_to=upload_cover_image_path)
    cover_image_thumbnail = ImageSpecField(
        source='cover_image',
        processors=[],
        format='JPEG',
        options={'quality': 90}
    )
    active = models.BooleanField(default=True)
    modified_on = models.DateField(auto_now=True)
    created_on = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Songs(models.Model):
    album = models.ForeignKey(Albums, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    song_file = models.FileField(upload_to=None, validators=[song_file_validator])
    genre = models.CharField(
        max_length=100,
        choices=Genres.choices,
        default=Genres.DANCEHALL
    )
    duration = models.DurationField(blank=True, null=True)
    added_on = models.DateField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name
