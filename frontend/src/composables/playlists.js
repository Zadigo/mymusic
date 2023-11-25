import { client } from '@/plugins/axios'

function isFunction (func) {
  if (typeof func === 'function') {
    return true
  } else {
    return false
  }
}

export default function usePlaylistComposable () {
  async function getUserPlaylists (callback) {
    // Get all the playlists for a given user
    try {
      const response = await client.get(`playlists`)
      if (isFunction(callback)) {
        callback(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function renamePlaylist (playlist, data, callback) {
    // Rename's a user's playlist
    try {
      const response = await client.post(`playlists/${playlist.id}/rename`, data)
      if (isFunction(callback)) {
        callback(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  async function deletePlaylist (playlist, callback) {
    // Deletes a user's playlist
    try {
      const response = await client.post(`playlists/${playlist.id}/delete`)
      if (isFunction(callback)) {
        callback(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function followPlaylist (playlist, callback) {
    // Allows the user to follow a playlist
    try {
      const response = await client.post(`playlists/${playlist.id}/follow`)
      if (isFunction(callback)) {
        callback(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return {
    followPlaylist,
    getUserPlaylists,
    renamePlaylist,
    deletePlaylist
  }
}
