<template>
  <section id="playlist">
    enfziefoz
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
  },

  computed: {
    ...mapGetters('userPlaylistModule', ['hasPlaylists'])
  },

  beforeMount () {
    // Load all the user's playlists in order
    // to facilitate further navigation
    if (!this.hasPlaylists) {
      this.$api.playlists.all()
      .then((response) => {
        this.$store.commit('userPlaylistModule/setUserPlaylists', response.data)
      })
      .catch((error) => {
        error
      })
    }
  }
}
</script>
