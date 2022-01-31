import secrets

def playlists_cover_image_path(instance, name):
    new_name = secrets.token_hex(nbytes=10)
    _, ext = name.split('.')
    return f'playlists/{instance.artist.name}/{new_name}.{ext}'
