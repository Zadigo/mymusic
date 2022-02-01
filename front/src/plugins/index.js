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
    }
}
