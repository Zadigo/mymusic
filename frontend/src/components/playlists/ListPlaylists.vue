<template>
  <div class="col-12 my-3">
    <div v-if="store.playlists.length > 0" class="row">
      <div v-for="playlist in store.playlists" :key="playlist.id" class="col-4">
        <router-link :to="{ name: 'playlist_view', params: { id: playlist.id } }" :aria-label="playlist.name" class="text-decoration-none text-white">
          <div class="card my-2">
            <img :src="mediaUrl(playlist.cover_image)" :alt="playlist.name" class="card-img-top">
            <div class="card-body">
              <h4 class="fw-bold card-title">{{ playlist.name }}</h4>
              <p class="card-text text-muted m-0">Created by {{ playlist.author.username }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-12">
        <div class="card bg-transparent shadow-none py-5 my-5 text-muted text-center">
          <div class="card-content">
            <font-awesome-icon icon="fa-solid fa-music" class="mb-4" size="5x" />
            <h4 class="display-5">
              There are no playlists available
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlaylists } from '../../store/playlists'
import { mediaUrl } from '@/utils'

export default {
  name: 'ListPlaylists',
  setup () {
    const store = usePlaylists()
    return {
      store,
      mediaUrl
    }
  }
}
</script>

<style scoped>
.card {
  transition: all .3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}

.card .card-img-top {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, .175) !important;
}

.card:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

</style>
