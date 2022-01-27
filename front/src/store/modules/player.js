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
            state.currentSong = payload.song[0]
            if (state.currentPlaylistId == null | state.currentPlaylistId != payload.playlistId) {
                state.waitingList = payload.playlist
            }
            state.currentPlaylistId = payload.playlistId
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
        preeviousSong (state) {
            state
        },
        toggleShuffle (state) {
            state
        },
        toggleRepeat (state) {
            state
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
