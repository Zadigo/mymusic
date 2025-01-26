import { useSongs } from '@/stores/songs'
import { AlbumSong, Song } from '@/types'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref } from 'vue'

export function useSongComposable() {
    const songStore = useSongs()
    const { currentlySelected, showSongDetails } = storeToRefs(songStore)

    function handleShowSongDetails(song: Song) {
        currentlySelected.value = song
        showSongDetails.value = true
    }

    return {
        handleShowSongDetails
    }
}

/** Composable for setting up a media player */
export function useMediaPlayer() {
    const audioPlayerEl = ref<HTMLAudioElement>()

    const queue = ref<Song[] | AlbumSong[]>([])

    const isPlaying = ref(false)
    // Indicates that the user has played the
    // song for the first time
    const firstPlay = ref(false)
    // Flag that catches when the user has
    // skipped certain parts of the song
    const isSkipped = ref(false)
    const songDuration = ref(0)
    const songActualTime = ref(0)

    function formatTime(time: number) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function handleProgress() {
        if (audioPlayerEl.value) {
            songActualTime.value = audioPlayerEl.value.currentTime
        }
    }
    
    const formattedDuration = computed(() => formatTime(songDuration.value));
    const formattedActualTime = computed(() => formatTime(songActualTime.value));
    
    // Returns the percentage of the song that
    // the was completed by the user
    const percentageCompleted = computed(() => {
        if (songDuration.value === 0) {
            return 0
        } else {
            return parseInt(((songActualTime.value / songDuration.value) * 100).toFixed(0), 10);
        }
    })

    // Returns whether the song was completed
    const isCompleted = computed(() => {
        return percentageCompleted.value === 100
    })

    onMounted(() => {
        if (audioPlayerEl.value) {
            audioPlayerEl.value.addEventListener('timeupdate', handleProgress)
        }
    })

    onUnmounted(() => {
        if (audioPlayerEl.value) {
            audioPlayerEl.value.removeEventListener('timeupdate', handleProgress)
        }
    })

    function handleMetadata(e: Event) {
        const audio = e.target as HTMLAudioElement
        songDuration.value = audio.duration
    }

    function handlePlay() {
        if (audioPlayerEl.value) {
            if (songActualTime.value === 0 && !firstPlay.value) {
                firstPlay.value = true
            }

            isPlaying.value = true
            audioPlayerEl.value.play()
        }
    }

    function handlePause() {
        if (audioPlayerEl.value) {
            isPlaying.value = false
            audioPlayerEl.value.pause()
        }
    }

    function handleProgressChange() {
        if (audioPlayerEl.value) {
            if (songActualTime.value > 0 && firstPlay.value) {
                isSkipped.value = true
            }
            audioPlayerEl.value.currentTime = songActualTime.value
        }
    }
    
    function handleSkip() {
        // Do something
    }

    return {
        queue,
        audioPlayerEl,
        isPlaying,
        isSkipped,
        isCompleted,
        firstPlay,
        songActualTime,
        songDuration,
        formattedDuration,
        formattedActualTime,
        percentageCompleted,
        handleProgressChange,
        handleMetadata,
        handlePlay,
        handlePause,
        handleSkip
    }
}
