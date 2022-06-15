<template>
  <div id="app">
    <v-app>
      <router-view :key="$route.name" />
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters('userPlaylistModule', ['hasPlaylists'])
  },
  mounted() {
    // Initially load all the users playlists
    // when we start the app since some pages
    // require this to be set in advance so that
    // they can be displayed
    if (!this.hasPlaylists) {
      this.getPlaylists()
    }
  },
  methods: {
    async getPlaylists() {
      try {
        var response = await this.$axios.post('/playlists/', { user_id: 1 })
        this.$store.commit('userPlaylistModule/setUserPlaylists', response.data)
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
@import url('./assets/style.css');

::-webkit-scrollbar {
  width: .25em;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  /* outline: 1px solid slategrey; */
}
</style>
