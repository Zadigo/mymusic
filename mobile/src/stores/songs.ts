import { Song } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSongs = defineStore('songs', () => {
    const songs = ref<Song[]>([])
    const currentSong = ref<Song>()

    return {
        songs,
        currentSong
    }
})
