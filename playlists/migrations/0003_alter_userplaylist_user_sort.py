# Generated by Django 4.1.1 on 2022-10-30 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0002_alter_officialplaylist_cover_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userplaylist',
            name='user_sort',
            field=models.CharField(choices=[('Song name', 'Song Name'), ('Album name', 'Album Name'), ('Artist name', 'Artist Name'), ('Added', 'Added'), ('Duration', 'Duration'), ('Genre', 'Genre')], default='Album name', max_length=50),
        ),
    ]
