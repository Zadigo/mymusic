<template>
  <section id="playlist">
    <div class="row">

      <div v-for="playlist in playlists" :key="playlist.id" class="col-3">
        <b-card :title="playlist.name" :img-src="playlist.image" :img-alt="playlist.name" img-top>
          <b-card-text>
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
