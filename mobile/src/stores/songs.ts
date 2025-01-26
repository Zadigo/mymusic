import { Song, UserPlaylist } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSongs = defineStore('songs', () => {
    const songs = ref<Song[]>([])
    
    // The song that is currently being played
    // by the user or by the automatic feed
    const currentlyPlayed = ref<Song>()
    const currentPlaylistIndex = ref(0)
    const currentlyPlayedPlaylist = ref<UserPlaylist>()

    // The details of the song that is currently
    // being viewed by the user
    const currentlySelected = ref<Song>()
    
    const showSongDetails = ref(false)

    // Modals
    const showPlaylistsModal = ref(false)

    const currentPlaylistSong = computed(() => {
        if (currentlyPlayedPlaylist.value) {
            return currentlyPlayedPlaylist.value.songs[currentPlaylistIndex.value]
        } else {
            return null
        }
    })

    function handleShowSongDetails(song: Song) {
        currentlySelected.value = song
        showSongDetails.value = true
    }

    return {
        songs,
        showSongDetails,
        showPlaylistsModal,
        currentPlaylistSong,
        currentlySelected,
        currentlyPlayed,
        currentlyPlayedPlaylist,
        handleShowSongDetails,
    }
})
