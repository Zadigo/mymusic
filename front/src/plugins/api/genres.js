var getAll = ($axios) => {
    return () => {
        return $axios({
            method: 'get',
            url: '/genres',
        })
    }
}

export default ($axios) => ({
    all: getAll($axios)
})
