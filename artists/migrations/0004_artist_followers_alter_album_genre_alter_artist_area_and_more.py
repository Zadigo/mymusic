# Generated by Django 4.0.1 on 2022-01-31 10:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('artists', '0003_song_bitrate_alter_album_genre_alter_artist_area_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='followers',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='album',
            name='genre',
            field=models.CharField(choices=[('Kompa', 'Kompa'), ('Dancehall', 'Dancehall'), ('Zouk', 'Zouk')], default='Dancehall', max_length=100),
        ),
        migrations.AlterField(
            model_name='artist',
            name='area',
            field=models.CharField(choices=[('Guadeloupe', 'Guadeloupe'), ('Jamaica', 'Jamaica')], default='Jamaica', max_length=100),
        ),
        migrations.AlterField(
            model_name='artist',
            name='genre',
            field=models.CharField(choices=[('Kompa', 'Kompa'), ('Dancehall', 'Dancehall'), ('Zouk', 'Zouk')], default='Dancehall', max_length=100),
        ),
        migrations.AlterField(
            model_name='artist',
            name='nationality',
            field=models.CharField(choices=[('French', 'French'), ('Jamaican', 'Jamaican')], default='Jamaican', max_length=100),
        ),
        migrations.AlterField(
            model_name='song',
            name='genre',
            field=models.CharField(choices=[('Kompa', 'Kompa'), ('Dancehall', 'Dancehall'), ('Zouk', 'Zouk')], default='Dancehall', max_length=100),
        ),
    ]
