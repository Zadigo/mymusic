from django.utils.crypto import get_random_string


def playlists_cover_image_path(instance, name):
    new_name = get_random_string(10)
    _, ext = name.split('.')
    return f'playlists/cover_{new_name}.{ext}'
