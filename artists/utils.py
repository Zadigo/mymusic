import secrets
from calendar import monthrange

from django.utils.crypto import get_random_string
from django.utils.timezone import now


def to_snake_case(value):
    value = value.lower()
    return value.replace('-', '').replace(' ', '_')


def song_path(instance, name):
    new_file_name = get_random_string(length=30)
    song_name, ext = name.split('.')
    song_name = to_snake_case(song_name)
    album = to_snake_case(instance.album.name)
    return f'albums/{album}/{new_file_name}.{ext}'


def cover_image_path(instance, name):
    new_name = secrets.token_hex(nbytes=10)
    _, ext = name.split('.')
    album_name = instance.name
    album_name = album_name.replace(' ', '_').lower()
    return f'cover/{album_name}/{new_name}.{ext}'


def artist_cover_image_path(instance, name):
    new_name = secrets.token_hex(nbytes=10)
    _, ext = name.split('.')
    artist_name = instance.name
    artist_name = artist_name.replace(' ', '_').lower()
    return f'artists/{artist_name}/{new_name}.{ext}'


def number_of_days_in_month():
    current_date = now()
    return monthrange(current_date.year, current_date.month)
