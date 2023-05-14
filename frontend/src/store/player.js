import { defineStore } from 'pinia'
import { useUrls } from '@/composables/utils'

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
    },
    resume () {
      // Resume a current song
      if (this.hasSong) {
        this.isPlaying = true
      }
    }
  },
  getters: {
    getCurrentSongFile () {
      if (Object.keys(this.currentSong).length === 0) {
        return ''
      }
      const { mediaUrl } = useUrls()
      return mediaUrl(this.currentSong.song_file)
    },
    isCurrentSong () {
      return (song) => {
        return song.name === this.currentSong.name
      }
    },
    hasSong () {
      // Whether the player has a loaded song
      const keys = Object.keys(this.currentSong)
      return keys.length > 0
    }
  }
})

export {
  usePlayer
}
