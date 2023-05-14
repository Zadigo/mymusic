import { defineStore } from 'pinia'

const useAuthentication = defineStore('authentication', {
  state: () => ({
    user: {
      email: null
    },
    token: null,

    loginModal: false,
    profileComponentName: 'profile-overview'
  }),
  actions: {
    logoutUser () {
      this.user = { email: null, token: null }
      this.token = null
      this.session.remove('auth')
    },
    loginUser (data) {
      this.user = data
      this.token = data.token
    },
    loadUserSession () {
      const session = this.$session.retrieve('auth')
      // TODO: Remove test token
      const data = session || { email: null, token: 'c4ddf648feaed3d2ef2796769d4e6386ed4f076d' }
      this.loginUser(data)
    }
  },
  getters: {
    isAuthenticated () {
      this.loadUserSession()
      return this.token !== null
    }
  }
})

export {
  useAuthentication
}
