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

// Simulates data from the database
export function createSongMockup () {
    return Array.from({ length: 300 }, (_, i) => {
        const randomIndex = Math.floor(Math.random() * randomImages.length)

        return {
            id: i + 1,
            name: `Song n°${i + 1}`,
            video_source: '/vid1.mp4',
            prefers_video: (i + 1) === 3,
            album: {
                id: i + 1,
                name: `Album n°${i + 1}`,
                album_image: randomImages[randomIndex],
            },
            artist: {
                id: i + 1,
                name: `Artist n°${i + 1}`,
                description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium fuga incidunt enim distinctio...'
            }
        }
    })
}
