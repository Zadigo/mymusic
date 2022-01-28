var playerModule = {
    namespaced: true,

    state: () => ({
        currentSong: null,
        currentAlbum: null,
        currentPlaylistId: null,

        isPlaying: false,
        waitingList: [],
        
        shuffleActivated: false,
        repeatActivated: false
    }),

    mutations: {
        setSong(state, payload) {
            // Sets the current song to be
            // played
            state.currentSong = payload.song[0]
            if (state.currentPlaylistId == null | state.currentPlaylistId != payload.playlistId) {
                state.waitingList = payload.playlist
            }
            state.currentPlaylistId = payload.playlistId
        },

        setWaitingList (state, playlist) {
            // Set the list of songs to play
            // by the player starting from
            // the current song
            state.waitingList = playlist
        },

        play (state) {
            if (!state.isPlaying) {
                state.isPlaying = true
            }
        },

        pause (state) {
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
        setCurrentSong({commit}, payload) {
            // Sets the player to the current
            // song. Expects an array.
            commit('setSong', payload)
            commit('play')
        }
    }
}

export default playerModule
