<template>
  <section id="playlist">
    <div class="row">

      <div class="col-12">
        <v-btn v-for="(choice, index) in displayChoices" :key="index" text @click="componentToShow == choice.name">
          {{ choice.name }}
        </v-btn>
      </div>

      <list-playlists v-if="componentToShow == 'playlists'" :playlists="playlists" />
    
      <list-artists v-else-if="componentToShow == 'artists'" />
      
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
  name: 'Playlists',

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

  beforeMount () {
    this.$api.playlists.all()
    .then((response) => {
      this.$store.commit('userPlaylistModule/setUserPlaylists', response.data)
    })
    .catch((error) => {
      console.log(error)
    })
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
