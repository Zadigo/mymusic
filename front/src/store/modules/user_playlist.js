import { toInteger } from 'lodash'
import myplaylists from '../../data/myplaylists.json'

var _ = require('lodash')

var userPlaylistModule = {
    namespaced: true,
    state: () => ({
        playlists: myplaylists,
        currentPlaylist: null,
        sortBy: null
    }),

    mutations: {
        setSortBy (state, item) {
            // Set the sorting method for the
            // playlist or for all the playlists
            state.sortBy = item.toLowerCase()
        },

        setCurrentPlaylist(state, playlist) {
            // Set the current playlist that
            // is viewed/used by the user
            state.currentPlaylist = playlist
        }
    },

    getters: {
        getPlaylist (state) {
            // Get a playlist for the list
            // of playlists created by the user
            return (playlistId) => {
                var id = toInteger(playlistId)
                return _.find(state.playlists, { id: id })
            }
        },

        getSortedSongs (state) {
            // Return all the songs that were sorted
            // in the playlist
            var playlist = _.find(state.playlists, state.playlistName)
            return _.sortBy(playlist.songs, [state.sortBy])
        },

        getSearchedSongs (state) {
            // Return all the songs that were
            // searched for in the playlist
            return (search) => {
                if (_.isNull(search)) {
                    return state.currentPlaylist.songs
                } else {
                    return _.filter(state.currentPlaylist.songs, (song) => {
                        return song.name.includes(search) | song.artist.includes(search)
                    })
                }
            }
        }
    }
}

export default userPlaylistModule
