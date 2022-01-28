<template>
  <div class="col-12">
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
</template>

<script>
export default {
  name: 'ListPlaylists',
  props: {
    playlists: {
      type: Array,
      required: true
    }
  }
}
</script>
