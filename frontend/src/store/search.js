import { defineStore } from 'pinia'

const useSearch = defineStore('search', {
  state: () => ({
    currentSearch: null,
    currentArtist: {},
    currentAlbum: {}  
  }),
  actions: {
  },
  getters: {
    searchHistory () {
      return []
    }
  }
})

export {
  useSearch
}
