<template>
  <div class="col-12 my-3">
    <div v-if="store.playlists.length > 0" class="row">
      <article v-for="playlist in store.playlists" :key="playlist.id" class="col-4">
        <router-link :to="navigateToPlaylist(playlist)" :aria-label="playlist.name" class="text-decoration-none text-white">
          <div class="card my-2">
            <img :src="mediaUrl(playlist.cover_image)" :alt="playlist.name" class="card-img-top">
            <div class="card-body">
              <h4 class="fw-bold card-title">{{ playlist.name }}</h4>
              <p class="card-text text-muted m-0">Created by {{ playlist.author.username }}</p>
            </div>
          </div>
        </router-link>
      </article>
    </div>

    <empty-iteration-vue v-else class="py-5 my-5" content="There are no playlists available" />
  </div>
</template>

<script>
import { useUrls } from '@/composables/utils'
import { usePlaylists } from '../../store/playlists'

import EmptyIterationVue from '../EmptyIteration.vue'

export default {
  name: 'ListPlaylists',
  components: { EmptyIterationVue },
    setup () {
    const store = usePlaylists()
    const { mediaUrl } = useUrls()
    return {
      store,
      mediaUrl
    };
  },
  methods: {
    navigateToPlaylist (playlist) {
      this.store.setPlaylist(playlist.id)
      return { name: 'playlist_view', params: { id: playlist.id } }
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
