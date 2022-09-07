import { defineStore, storeToRefs } from 'pinia'
import { usePlayer } from './player'
import _, { toNumber } from 'lodash'

const usePlaylists = defineStore('playlists', {
  state: () => ({
    cursor: 0,
    playlists: [],
    currentPlaylist: { songs: [] },
    playAllSongs: false
  }),
  actions: {
    setPlaylist (id) {
      const numberId = toNumber(id)
      this.currentPlaylist = _.find(this.playlists, ['id', numberId])
    },
    increaseCursor () {
      // Do something
    },
    decreaseCursor () {
      // Do something
    },
    playAll () {
      this.cursor = 0
      this.playAllSongs = true

      const store = usePlayer()
      store.play(this.currentSong)
    },
    startPlaylist () {
      const store = usePlayer()
      store.play(this.currentSong)
    },
    stopPlaylist () {
      this.playAllSongs = false

      const store = usePlayer()
      store.pause()
    },
    nextSong () {
      const store = usePlayer()
      this.increaseCursor()
      store.play(this.currentSong)
    },
    previousSong () {
      const store = usePlayer()
      this.decreaseCursor()
      store.play(this.currentSong)
    },
    randomSong () {
      const store = usePlayer()
      // TODO: Some random number
      this.cursor = 0
      store.play(this.currentSong)
    },
    loadFromCache (forceUpdate = false) {
      if (forceUpdate) {
        this.playlists = this.$session.retrieve('playlists')
      } else {
        if (Object.keys(this.currentPlaylist).length === 0) {
          this.playlists = this.$session.retrieve('playlists')
        }
      }
    }
  },
  getters: {
    currentSong () {
      return this.currentPlaylist.songs[this.cursor] || {}
    },
    byGenre () {
      return []
    },
    _isPlaying () {
      const store = usePlayer()
      const { isPlaying } = storeToRefs(store)
      return isPlaying.value
    }
  }
})

export {
  usePlaylists
}
