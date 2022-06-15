<template>
  <div class="col-12">
    <div class="row">

      <div v-for="playlist in playlists" :key="playlist.id" class="col-4">
        <router-link :to="{ name: 'playlist_view', params: { id: playlist.id } }" :aria-label="playlist.name" class="text-decoration-none text-white">
          <b-card class="p-2" :title="playlist.name" :img-src="playlist.cover_image|getFullUrl" :img-alt="playlist.name" img-top>
            <b-card-text>
              <p class="text-muted">{{ $t('created_by', { username: playlist.author.username}) }}</p>
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

<style scoped>
.card {
  transition: all .3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}

.card .card-img {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0,.175) !important;
}

.card:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
