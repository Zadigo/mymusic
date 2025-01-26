import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthentictation = defineStore('authentication', () => {
    const showProfileModal = ref(false)
    const showQrCodeModal = ref(false)

    return {
        showQrCodeModal,
        showProfileModal
    }
})
