# Generated by Django 4.0.1 on 2022-02-03 13:24

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0002_rename_song_userplaylist_songs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userplaylist',
            name='cover_image',
            field=imagekit.models.fields.ProcessedImageField(blank=True, null=True, upload_to=''),
        ),
    ]