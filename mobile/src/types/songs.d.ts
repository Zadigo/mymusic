import { Artist } from "./artists"

export interface Album {
    id: number
    artist: Pick<Artist,  'id' | 'name' | 'fullname' | 'presentation' | 'cover_image' | 'cover_image_thumbnail'>
    name: string
    genre: string
    cover_image: string
    cover_image_thumbnail: string
    producer: string
    number_of_plays: number
    is_single: boolean
    is_active: boolean
    release_date: string
    created_on: string
    // album_image: string
}

export interface Song {
    id: number,
    album: Album
    name: string
    song_file: string
    genre: string
    featuring_artists: Artist[]
    duration: number
    bitrate: number
    is_explicit: boolean
    added_on: string

    // TODO: Add to database
    prefers_video: boolean
    video_source: string
}

// Song from an album with a less precise data
export interface AlbumSong extends Pick<Song, 'name' | 'genre' | 'song_file' | 'duration' | 'bitrate' | 'is_explicit' | 'added_on'> {
    id: number
}
