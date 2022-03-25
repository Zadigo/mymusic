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

        moveToIndex (state, index) {
            // Move to the next index
            state.currentSong = state.waitingList[index]
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
        playSelected ({ commit }, payload) {
            // Sets the player to the current
            // song. Expects an array.
            let { songId, playlist } = payload

            commit('setWaitingList', playlist)
            commit('setSong', songId)
            commit('play')
        },

        startPlaylist({ commit }, playlistSongs) {
            commit('setWaitingList', playlistSongs)
            commit('setSong', _.first(playlistSongs)['id'])
            commit('play')
        },

        pauseSelected ({ commit }, payload) {
            let { songId } = payload
            songId
            commit('pause')
        },

        playPreviousSong ({ state, rootGetters, commit }) {
            // Go to the next song of the playlist
            var currentSongIndex = _.findIndex(state.waitingList, ['id', state.currentSong.id])
            var nextSongIndex = currentSongIndex + 1
            nextSongIndex > rootGetters.numberOfSongs ? nextSongIndex = 0 : nextSongIndex
            commit('moveToIndex', nextSongIndex)
        },
        playNextSong ({ state, rootGetters, commit }) {
            // Go to the next song of the playlist
            var currentSongIndex = _.findIndex(state.waitingList, ['id', state.currentSong.id])
            var nextSongIndex = currentSongIndex - 1
            nextSongIndex < 0 ? nextSongIndex = rootGetters.numberOfSongs : nextSongIndex
            commit('moveToIndex', nextSongIndex)
        }
    },

    getters: {
        numberOfSongs (state) {
            // Return the number of songs
            // in the waiting list
            return state.waitingList.length
        }
    }
}

export default playerModule
