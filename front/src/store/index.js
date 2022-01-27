import Vue from 'vue'
import Vuex from 'vuex'

// var _ = require('lodash')

import songs from '../data/songs.json'
import artists from '../data/artists.json'

import playerModule from './modules/player'
import userPlaylistModule from './modules/user_playlist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs: songs,
    artists: artists
  },

  mutations: {
  },
  
  actions: {
    // a({state, getters, dispatch, rootGetters, rootState, commit}) {}
  },
  
  modules: {
    playerModule,
    userPlaylistModule
  }
})
