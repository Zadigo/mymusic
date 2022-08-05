import { defineStore } from 'pinia'

const usePlayer = defineStore('player', {
  state: () => ({
    isPlaying: false,
    currentSong: {}
  }),
  actions: {
    play (song) {
      this.currentSong = song
      this.isPlaying = true
    },
    pause () {
      this.isPlaying = false
    }
  }
})

export {
  usePlayer
}
