import secrets


def upload_song_path(instance, name):
    new_name = secrets.token_hex(nbytes=10)
    _, ext = name.split('.')
    return f'songs/{new_name}.{ext}'


def upload_cover_image_path(instance, name):
    new_name = secrets.token_hex(nbytes=10)
    _, ext = name.split('.')
    return f'cover/{instance.artist.name}/{new_name}.{ext}'


def artist_cover_image_path(instance, name):
    new_name = secrets.token_hex(nbytes=10)
    _, ext = name.split('.')
    return f'artists/{instance.artist.name}/{new_name}.{ext}'
