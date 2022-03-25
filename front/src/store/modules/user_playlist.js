import { toInteger } from 'lodash'

var _ = require('lodash')

var userPlaylistModule = {
    namespaced: true,

    state: () => ({
        playlists: [],
        currentPlaylist: null,
        sortBy: 'name',
        search: null
    }),

    mutations: {
        setUserPlaylists (state, playlists) {
            state.playlists = playlists
        },

        updatePlaylists (state, playlist) {
            state.playlists.push(playlist)
        },

        updatePlaylistSorting(state, payload) {
            let { id, songs } = payload
            var index = _.findIndex(state.playlists, {id: id})
            state.playlists[index]['songs'] = songs
            state.currentPlaylist = state.playlists[index]
        },

        updateSinglePlaylist (state, playlist) {
            // Updates the informations of on playlist
            // in the stack
            var playlistIndex = _.findIndex(state.playlists, ['id', playlist.id])
            state.playlists[playlistIndex].songs = playlist.songs
        },

        deletePlaylist (state, playlist) {
            var playlistIndex = _.findIndex(state.playlists, ['id', playlist.id])
            state.playlists.splice(playlistIndex, 1)
        },

        setSortBy(state, sortMethod) {
            // Set the sorting method for the
            // playlist or for all the playlists
            state.sortBy = sortMethod.toLowerCase()
        },

        setCurrentViewedPlaylist(state, playlistId) {
            // Set the current playlist that
            // is viewed/used by the user
            var id = toInteger(playlistId)
            state.currentPlaylist = _.find(state.playlists, ['id', id])
        },

        setSearch (state, value) {
            state.search = value
        }
    },

    getters: {
        hasPlaylists (state) {
            // Check if the user's playlists were
            // already loaded
            return state.playlists.length > 0
        },

        getPlaylist (state) {
            // Get a playlist for the list
            // of playlists created by the user
            return (playlistId) => {
                var id = toInteger(playlistId)
                return _.find(state.playlists, { id: id })
            }
        },

        playlistSongs(state) {
            // Returns the songs from the current playlist
            // the user is visiting
            try {
                return state.currentPlaylist.songs
            } catch {
                return []
            }
        },

        // getSortedSongs (state, rootGetters) {
        //     // Return all the songs that were sorted
        //     // in the playlist. The default sort 
        //     // is by the song name
        //     return _.sortBy(rootGetters.getSongs, [state.sortBy])
        // },

        getSearchedSongs (state, rootGetters) {
            // Return all the songs that were
            // searched for in the playlist
            if (_.isNull(state.search)) {
                return rootGetters.playlistSongs
            } else {
                return _.filter(rootGetters.playlistSongs, (song) => {
                    // return song.name.includes(state.search) | song.artist.includes(state.search)
                    return song.name.includes(state.search) | song.album.artist.name.includes(state.search) | song.genre.includes(state.search) | song.genre.toLowerCase().includes(state.search)
                })
            }
        },

        getAllPlaylistNames (state) {
            // Get all the user's playlists names
            return _.map(state.playlists, (playlist) => { return { id: playlist.id, name: playlist.name } })
        }
    }
}

export default userPlaylistModule
