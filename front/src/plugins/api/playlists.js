var getAll = (_axios) => {
    return (userId) => {
        return _axios({
            method: 'get',
            url: '/playlists',
            data: { user_id: userId }
        })
    }
}

var addSong = (_axios) => {
    return (playlistId, songId) => {
        return _axios({
            method: 'post',
            url: `/playlists/${playlistId}/add`,
            data: { song_id: songId }
        })
    }
}

var removeSong = (_axios) => {
    return (playlistId, songId) => {
        return _axios({
            method: 'delete',
            url: `/playlists/${playlistId}/remove`,
            data: { song_id: songId }
        })
    }
}

var deletePlaylist = (_axios) => {
    return (playlistId) => {
        return _axios({
            method: 'delete',
            url: `/playlists/${playlistId}`
        })
    }
}

var changeName = (_axios) => {
    return (playlistId, newName) => {
        return _axios({
            method: 'post',
            url: `/playlists/${playlistId}`,
            data: { name: newName }
        })
    }
}

var changeSorting = (_axios) => {
    return (playlistId, method) => {
        return _axios({
            method: 'post',
            url: `/playlists/${playlistId}`,
            data: { method: method }
        })
    }
}

export default (_axios) => ({
    all: getAll(_axios),
    add: addSong(_axios),
    remove: removeSong(_axios),
    delete: deletePlaylist(_axios),
    changeSort: changeSorting(_axios),
    changeName: changeName(_axios)
})
