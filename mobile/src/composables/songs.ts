import { useSongs } from '@/stores/songs'
import { Song } from '@/types'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

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

export function useMediaPlayer() {
    const songToPlay = ref<Song>()
    const currentTime = ref(0)

    // Returns the percentage of the song that
    // the was completed by the user
    const percentageComplete = computed(() => {
        return currentTime.value / 160
    })

    function handlePlay(song: Song) {
        console.log(song)
    }

    function handleStop(song: Song) {
        console.log(song)
    }
    
    function handleSkip(song: Song) {
        console.log(song)
    }

    return {
        songToPlay,
        currentTime,
        percentageComplete,
        handlePlay,
        handleStop,
        handleSkip
    }
}
