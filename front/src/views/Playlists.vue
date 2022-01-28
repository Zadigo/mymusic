<template>
  <section id="playlist">
    <div class="row">

      <div v-for="playlist in playlists" :key="playlist.id" class="col-4">
        <b-card class="p-2" :title="playlist.name" :img-src="playlist.playlist_cover" :img-alt="playlist.name" img-top>
          <b-card-text>
            <p class="text-muted">Created by: {{ playlist.author }}</p>
            <b-link :to="{ name: 'playlist', params: { id: playlist.id } }">
              Go to playlist >>
            </b-link>
          </b-card-text>
        </b-card>
      </div>
    
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Playlists',
  computed: {
    ...mapState('userPlaylistModule', ['playlists'])
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
