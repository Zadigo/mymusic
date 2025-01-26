import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthentictation = defineStore('authentication', () => {
    const showProfileModal = ref(false)

    return {
        showProfileModal
    }
})
