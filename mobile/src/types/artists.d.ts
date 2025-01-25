export interface Follower {
    id: id
}

export interface Artist {
    id: number
    name: string
    fullname: string
    presentation: string
    area: string
    nationality: string
    date_of_birth: string
    genre: string
    cover_image: string
    cover_image_thumbnail: string
    followers: Follower[]
    created_on: string
}
