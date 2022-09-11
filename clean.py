import os
import pathlib
from functools import lru_cache, wraps
from sys import path

BASE_DIR = pathlib.Path('.')


def create_paths(base_dir, paths):
    return (os.path.join(base_dir, path) for path in paths)


def delete(func):
    @wraps(func)
    def wrapper(*exclude):
        file_paths = list(func())
        print(file_paths)
        return True
    return wrapper


def clean_media_folder():
    media_folder = BASE_DIR / 'media'
    items = list(os.walk(media_folder))
    for item in items[1:]:
        file_paths = create_paths(item[0], item[1])
    print(file_paths)


@delete
def delete_migration():
    folders = list(os.walk(BASE_DIR))

    def exclusions(name):
        return all(
            [
                'frontend' not in name,
                'media' not in name,
                'static' not in name,
                'cache' not in name,
                not name.startswith('.\\.'),
                not name == '.'
            ]
        )
    filtered_folders = (folder for folder in folders if exclusions(folder[0]))
    app_folders = (
        folder for folder in filtered_folders if 'migrations' in folder[1])
    migration_folders_paths = {pathlib.Path(
        file[0], 'migrations') for file in app_folders}
    print(migration_folders_paths)
    for migration_folder_path in migration_folders_paths:
        files = list(os.walk(migration_folder_path))[-1]
        for file in files:
            print(migration_folder_path, file)
            # yield pathlib.Path(migration_folder_path, file)
            yield 1


if __name__ == '__main__':
    delete_migration('__init__', '__pycache__')
