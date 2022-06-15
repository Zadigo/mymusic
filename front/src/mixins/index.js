import Vue from 'vue'
import dayjs from '@/plugins/dayjs'

var _ = require('lodash')

var globalMixins = {
    filters: {
        getFullUrl (path) {
            var url = new URL(path, 'http://127.0.0.1:8000')
            return url.toString()
        },

        simpleDuration (value) {
            if (!_.isNull(value) | _.isUndefined(value)) {
                var tokens = value.split(':')
                var instance = dayjs.duration({ minutes: tokens[1], seconds: tokens[2] })
                return instance.format('mm:ss')
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
