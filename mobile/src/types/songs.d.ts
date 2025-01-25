import { Artist } from "./artists"

export interface Album {
    id: number
    name: string
    album_image: string
}

export interface Song {
    id: number,
    name: string
    video_source: string
    prefers_video: boolean
    artist: Artist
    album: Album
}
