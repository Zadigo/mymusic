var testFunction = (_axios) => {
    return (someId) => {
        return _axios({
            url: '/playlist',
            method: 'get',
            data: { id: someId }
        })
    }
}

export default (_axios) => ({
    testsFunction: testFunction(_axios)
})
