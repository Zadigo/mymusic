# Generated by Django 4.0.1 on 2022-02-03 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0004_userplaylist_background_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='userplaylist',
            name='user_sort',
            field=models.CharField(choices=[('Album name', 'Album Name'), ('Artist name', 'Artist Name'), ('Added', 'Added'), ('Duration', 'Duration'), ('Genre', 'Genre')], default='Album name', max_length=50),
        ),
    ]