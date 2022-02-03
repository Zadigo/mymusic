<template>
  <div class="col-12">
    <div class="row">

      <div v-for="playlist in playlists" :key="playlist.id" class="col-4">
        <router-link :to="{ name: 'playlist', params: { id: playlist.id } }">
          <b-card class="p-2" :title="playlist.name" :aria-label="playlist.name" :img-src="playlist.cover_image|getFullUrl" :img-alt="playlist.name" img-top>
            <b-card-text>
              <p class="text-muted">Created by: {{ playlist.author }}</p>
            </b-card-text>
          </b-card>
        </router-link>
      </div>

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
