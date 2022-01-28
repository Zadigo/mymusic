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
    artists: artists
  }),

  mutations: {
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
