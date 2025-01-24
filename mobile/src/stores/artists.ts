import { Artist } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useArtists = defineStore('artists', () => {
    const artists = ref<Artist[]>([])
    const currentArtist = ref<Artist>()

    return {
        artists,
        currentArtist
    }
})
