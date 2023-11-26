import _, { toNumber } from 'lodash'

import { defineStore, storeToRefs } from 'pinia'
import { usePlayer } from './player'

// import userPlaylists from  '../data/user_playlists.json'

const usePlaylists = defineStore('playlists', {
  state: () => ({
    cursor: 0,
    // playlists: userPlaylists,
    playlists: [],
    currentPlaylist: { songs: [] },
    playAllSongs: false
  }),
  actions: {
    setPlaylist (id) {
      this.loadFromCache()
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
        if (this.playlists.length === 0) {
          this.playlists = this.$session.retrieve('playlists')
        }
      }
    },
    hasPlaylists () {
      // Whether there are playlists loaded
      // in the store
      return this.playlists.length > 0
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
    },
    playlistNames () {
      // Return only the names of the playlist
      return _.map(this.playlists, (playlist) => {
        return {
          id: playlist && playlist.id,
          name: playlist && playlist.name
        }
      })
    }
  }
})

export {
  usePlaylists
}
