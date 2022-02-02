import playlist from "./api/playlist"
import _axios from "./axios"


var formatDuration = (value) => {
    var tokens = value.split(':')
    return  `${tokens[0]}M${tokens[1]}S`
}

export default {
    install: (Vue) => {
        Vue.mixin({
            filters: {
                formatDuration: formatDuration
            }
        })

        Vue.prototype.$axios = {
            playlist: playlist(_axios)
        }
    }
}
