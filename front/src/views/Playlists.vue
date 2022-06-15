<template>
  <section id="playlists" class="p-5">
    <div class="row">

      <div class="col-12">
        <v-btn v-for="(choice, index) in displayChoices" :key="index" color="white" text @click="componentToShow == choice.name">
          {{ choice.name }}
        </v-btn>
      </div>

      <div class="col-12">
        <v-btn @click="createPlaylist">
          <font-awesome-icon class="mr-2" icon="plus" />
          {{ $t('Create playlist') }}
        </v-btn>
      </div>

      <!-- Playlists -->
      <list-playlists v-if="componentToShow == 'playlists'" :playlists="playlists" />

      <!-- Artists -->
      <list-artists v-else-if="componentToShow == 'artists'" />
      
      <!-- Albums -->
      <list-albums v-else-if="componentToShow == 'albums'" />

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import ListPlaylists from '../components/collections/ListPlaylists.vue'
import ListArtists from '../components/collections/ListArtists.vue'
import ListAlbums from '../components/collections/ListAlbums.vue'

export default {
  name: 'PlaylistsView',

  components: {
    ListPlaylists,
    ListArtists,
    ListAlbums
  },

  data () {
    return {
      displayChoices: [
        { name: 'playlists' },
        { name: 'artists' },
        { name: 'albums' }
      ],
      componentToShow: 'playlists'
    }
  },

  computed: {
    ...mapState('userPlaylistModule', ['playlists'])
  },

  methods: {
    async createPlaylist() {
      try {
        var response = await this.$axios.post('/playlists/create')
        var playlist = response.data

        this.$store.commit('userPlaylistModule/updatePlaylists', playlist)
        this.$router.push({ name: 'playlist', params: { id: playlist.id } })
      } catch(error) {
        console.log(error)
      }
    }
  }
}

</script>

<style scoped>
  h4 {
    font-size: 1.2rem;
    margin-bottom: 0;
  }

  .card-img-top {
    box-shadow: 0 0.5rem .6rem rgba(0, 0, 0, .25);
    border-radius: .25rem;
  }
</style>
