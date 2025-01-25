import { Follower } from './artists'
import { Song } from './songs'

export * from './artists'
export * from './songs'

export interface Playlist {
    id: number
    author: string
    name: string
    songs: Song[]
    cover_image: string
    background_color: string
    followers: Follower[]
    created_on: string
}

export interface UserPlaylist extends Playlist {
    user_sort: 'Song name' | 'Album name' | 'Artist name' | 'Added' | 'Duration' | 'Genre'
}

export interface OfficialPlaylist extends Exclude<Playlist, 'author'> {}
