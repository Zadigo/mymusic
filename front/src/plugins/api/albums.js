var search = (_axios) => {
    return (criterion) => {
        return _axios({
            method: 'post',
            url: '/search/albums',
            data: criterion
        })
    }
}

export default (_axios) => ({
    search: search(_axios)
})
