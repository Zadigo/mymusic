import { Artist } from "./artists"

export interface Song {
    id: number,
    artist: Artist
    album_image: string
}
