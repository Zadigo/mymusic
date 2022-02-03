import Vue from 'vue'
import Vuex from 'vuex'

var _ = require('lodash')

import albums from '../data/albums.json'
import artists from '../data/artists.json'

import playerModule from './modules/player'
import userPlaylistModule from './modules/user_playlist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    albums: albums,
    artists: artists,
    
    availableGenres: [],
    cachedSearch: null
  }),

  mutations: {
    setSearch (state, payload) {
      // When the user does a search on the website,
      // cache the result. In case the next search
      // is similar, we don't need to hit the backend
      state.cachedSearch = payload
    },

    setAvailableGenres (state, genres) {
      state.availableGenres = genres
    }
  },
  
  actions: {
    // a({state, getters, dispatch, rootGetters, rootState, commit}) {}
  },
  
  getters: {
    getAlbums (state) {
      // Get all available albums
      // on the plateform
      return state.albums
    },

    getAlbum (state) {
      return (albumId) => {
        return _.find(state.albums, { id: albumId })
      }
    },

    searchAlbums (state) {
      // Search albums by name, by genre,
      // artist name 
      return (searchValue) => {
        return _.filter(state.albums, (album) => {
          return album.album_name.includes(searchValue)
        })
      }
    }
  },
  
  modules: {
    playerModule,
    userPlaylistModule
  }
})
