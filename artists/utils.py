import secrets


def song_path(instance, name):
    new_name = secrets.token_hex(nbytes=10)
    _, ext = name.split('.')
    song_name, _ = name.split('.')
    song_name = name.replace('-', '').replace(' ', '_')
    return f'songs/{song_name}/{new_name}.{ext}'


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
