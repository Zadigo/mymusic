import albums from "./api/albums"
import genres from "./api/genres"
import playlists from "./api/playlists"

import _axios from "./axios"

export default {
    install: (Vue) => {
        Vue.prototype.$api = {
            albums: albums(_axios),
            genres: genres(_axios),
            playlists: playlists(_axios)
        }
    }
}
