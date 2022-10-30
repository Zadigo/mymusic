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
    }
  }
})

export {
  usePlayer
}
