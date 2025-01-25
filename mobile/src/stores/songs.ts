import { Song } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSongs = defineStore('songs', () => {
    const songs = ref<Song[]>([])
    // The song that is currently being played
    // by the user or by the automatic feed
    const currentlyPlayed = ref<Song>()
    // The details of the song that is currently
    // being viewed by the user
    const currentlySelected = ref<Song>()
    
    const showSongDetails = ref(false)

    // Modals
    const showPlaylistsModal = ref(false)

    function handleShowSongDetails(song: Song) {
        currentlySelected.value = song
        showSongDetails.value = true
    }

    return {
        songs,
        showSongDetails,
        showPlaylistsModal,
        currentlySelected,
        currentlyPlayed,
        handleShowSongDetails,
    }
})
