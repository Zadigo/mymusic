var _ = require('lodash')

var playerModule = {
    namespaced: true,

    state: () => ({
        currentSong: {},
        currentAlbum: null,
        currentPlaylistId: null,

        isPlaying: false,
        waitingList: [],
        
        shuffleActivated: false,
        repeatActivated: false
    }),

    mutations: {
        setSong(state, songId) {
            // Sets the current song to be
            // played and the playlist
            // state.currentSong = payload.song[0]
            state.currentSong = _.find(state.waitingList, ['id', songId])
        },
        
        setWaitingList (state, playlist) {
            // Set the list of songs to play
            // by the player starting from
            // the current song
            // if (state.currentPlaylistId == null | state.currentPlaylistId != payload.playlistId) {
            //     state.waitingList = payload.playlist
            // }
            // state.currentPlaylistId = payload.playlistId
            state.waitingList = playlist
        },

        play (state) {
            // Sets the local Audio player
            // state for the global application
            state.isPlaying = true
        },

        pause (state) {
            // Sets the local Audio player
            // state for the global application
            state.isPlaying = false
        },
        
        nextSong (state) {
            state
        },
        
        previousSong (state) {
            state
        },
        
        toggleShuffle (state) {
            // Toggle reapeat
            state.repeatActivated = !state.repeatActivated
        },
        
        toggleRepeat (state) {
            // Shuffle music
            state.shuffleActivated = !state.shuffleActivated
        }
    },

    actions: {
        setSelectedAndPlay({commit}, payload) {
            // Sets the player to the current
            // song. Expects an array.
            let { songId, playlist } = payload

            commit('setWaitingList', playlist)
            commit('setSong', songId)
            commit('play')
        }
    }
}

export default playerModule
