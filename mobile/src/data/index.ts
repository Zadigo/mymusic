import { AlbumSong, Song, UserPlaylist } from "@/types"

export const randomImages = [
    'music1.jpg',
    'music2.jpg',
    'music3.jpg',
    'music4.jpg',
    'music5.jpg',
    'music6.jpg',
    'music7.jpg',
    'music8.jpg',
    'music9.jpg'
]

const randomAlbumImages = [1, 2, 3, 4, 5]

function generateRandomArtistImage() {
    const randomIndex = Math.floor(Math.random() * randomImages.length)
    return randomImages[randomIndex]

}

function generateRandomAlbumImage() {
    const randomAlbumImageIndex = Math.floor(Math.random() * randomAlbumImages.length)
    return `album${randomAlbumImages[randomAlbumImageIndex]}.jpg`
}

// Simulates data from the database
export function createSongMockup (): Song[] {
    return Array.from({ length: 300 }, (_, i) => {
        const randomIndex = Math.floor(Math.random() * randomImages.length)
        const artistImage = randomImages[randomIndex]

        const randomAlbumImageIndex = Math.floor(Math.random() * randomAlbumImages.length)
        const albumImage = randomAlbumImages[randomAlbumImageIndex]

        return {
            id: i + 1,
            name: `Song n°${i + 1}`,
            genre: 'Rap',
            song_file: 'music1.mp3',
            duration: 163,
            bitrate: 145,
            is_explicit: false,
            added_on: '1-1-2025',
            prefers_video: false,
            video_source: 'video1.mp4',
            album: {
                id: i + 1,
                name: `My album name n°${i + 1}`,
                cover_image: `album${albumImage}.jpg`,
                cover_image_thumbnail: `album${albumImage}.jpg`,
                is_single: false,
                is_active: true,
                producer: 'Mario Gallop,Pura Gulli',
                genre: 'Rap',
                release_date: '1-1-2017',
                number_of_plays: 5,
                artist: {
                    id: i + 1,
                    name: 'Ciara',
                    fullname: 'Ciara Gallecia',
                    presentation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar adipiscing varius sagittis ultrices massa adipiscing semper quam ac dapibus nec lacus. Elementum pretium nam integer nisl et ridiculus erat odio cras iaculis cum egestas. Nascetur massa congue dignissim consectetur pellentesque sociosqu mauris enim pharetra semper volutpat morbi.',
                    cover_image: artistImage,
                    cover_image_thumbnail: artistImage
                },
                created_on: '1-1-2025'
            },
            featuring_artists: [
                {
                    id: 1,
                    name: 'Camille',
                    fullname: 'Camille De La Porta',
                    presentation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar adipiscing varius sagittis ultrices massa adipiscing semper quam ac dapibus nec lacus. Elementum pretium nam integer nisl et ridiculus erat odio cras iaculis cum egestas. Nascetur massa congue dignissim consectetur pellentesque sociosqu mauris enim pharetra semper volutpat morbi.',
                    cover_image: randomImages[randomIndex],
                    cover_image_thumbnail: randomImages[randomIndex],
                    area: 'Guadeloupe',
                    date_of_birth: '1-1-1992',
                    nationality: 'Française',
                    genre: 'Rap',
                    is_following: false,
                    created_on: '1-1-2017',
                    followers: [
                        {
                            id: 1
                        }
                    ]
                }
            ]
        }
    })
}

export function createAlbumSongs (): AlbumSong[] {
    return Array.from({ length: 5 }, (_, i) => {
        return {
            id: i + 1,
            name: `Some other song n°${i + 1}`,
            genre: 'Rap',
            song_file: 'music1.mp3',
            duration: 156,
            bitrate: 124,
            is_explicit: false,
            added_on: '1-1-2022'
        }
    })
}

export function createMockupPlaylists (): UserPlaylist[] {
    return [
        {
            id: 1,
            name: 'Paris & Congo',
            author: 'Julie Paris',
            background_color: '',
            cover_image: 'album1.jpg',
            user_sort: 'Album name',
            followers: [
                {
                    id: 1
                }
            ],
            created_on: '1-1-2025',
            songs: [
                {
                    id: 1,
                    name: `Song n°XXX`,
                    genre: 'Rap',
                    song_file: 'music1.mp3',
                    duration: 163,
                    bitrate: 145,
                    is_explicit: false,
                    added_on: '1-1-2025',
                    prefers_video: false,
                    video_source: 'video1.mp4',
                    album: {
                        id: 1,
                        name: `My album name ABC`,
                        cover_image: `album1.jpg`,
                        cover_image_thumbnail: `album$1.jpg`,
                        is_single: false,
                        is_active: true,
                        producer: 'Mario Gallop,Pura Gulli',
                        genre: 'Rap',
                        release_date: '1-1-2017',
                        number_of_plays: 5,
                        artist: {
                            id: 1,
                            name: 'Ciara',
                            fullname: 'Ciara Gallecia',
                            presentation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar adipiscing varius sagittis ultrices massa adipiscing semper quam ac dapibus nec lacus. Elementum pretium nam integer nisl et ridiculus erat odio cras iaculis cum egestas. Nascetur massa congue dignissim consectetur pellentesque sociosqu mauris enim pharetra semper volutpat morbi.',
                            cover_image: generateRandomAlbumImage(),
                            cover_image_thumbnail: generateRandomAlbumImage(),
                            is_following: true,
                        },
                        created_on: '1-1-2025'
                    },
                    featuring_artists: [
                        {
                            id: 1,
                            name: 'Camille',
                            fullname: 'Camille De La Porta',
                            presentation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar adipiscing varius sagittis ultrices massa adipiscing semper quam ac dapibus nec lacus. Elementum pretium nam integer nisl et ridiculus erat odio cras iaculis cum egestas. Nascetur massa congue dignissim consectetur pellentesque sociosqu mauris enim pharetra semper volutpat morbi.',
                            cover_image: generateRandomArtistImage(),
                            cover_image_thumbnail: generateRandomArtistImage(),
                            area: 'Guadeloupe',
                            date_of_birth: '1-1-1992',
                            nationality: 'Française',
                            genre: 'Rap',
                            is_following: false,
                            created_on: '1-1-2017',
                            followers: [
                                {
                                    id: 1
                                }
                            ]
                        }
                    ]
                }
            ] 
        }
    ]
}
