# Generated by Django 4.0.1 on 2022-01-31 10:10

import artists.utils
import artists.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0002_album_is_single_album_number_of_plays_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='bitrate',
            field=models.PositiveIntegerField(default=0),
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
        migrations.AlterField(
            model_name='song',
            name='song_file',
            field=models.FileField(upload_to=artists.utils.song_path, validators=[artists.validators.song_file_validator]),
        ),
    ]
