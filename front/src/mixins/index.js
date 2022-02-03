import Vue from 'vue'
var _ = require('lodash')

var globalMixins = {
    filters: {
        getFullUrl (path) {
            // if (_.isNull(path)) {
            //     return 'http://via.placeholder.com/800'
            // }
            var url = new URL(path, 'http://127.0.0.1:8000')
            return url.toString()
        },
        simpleDuration (value) {
            if (!_.isNull(value) | _.isUndefined(value)) {
                var tokens = value.split(':')
                return `${tokens[1]}:${tokens[2]}`
            } else {
                return '00:00'
            }
        },
        formatDuration (value) {
            if (!_.isNull(value) | _.isUndefined(value)) {
                var tokens = value.split(':')
                return `${tokens[0]}H${tokens[1]}M${tokens[2]}S`
            } else {
                return ''
            }
        }
    }
}

Vue.mixin(globalMixins)
