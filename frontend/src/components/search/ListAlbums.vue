<template>
  <scrollable-cards-vue v-if="albums.length > 0">
    <template #default>
      <article v-for="album in albums" :key="album.id" class="card bg-dark mx-2">
        <a href class="text-light" @click.prevent="goToPage(album)">
          <img :src="mediaUrl(album.cover_image_thumbnail)" :alt="album.artist.name" class="card-img-top">
          <div class="card-body">
            <h6 class="card-title fw-bold">
              {{ album.name }}
            </h6>
            <p class="card-text">2015</p>
          </div>
        </a>
      </article>
    </template>
  </scrollable-cards-vue>

  <empty-iteration-vue v-else content="No albums" />
</template>

<script>
import { useUrls } from '@/composables/utils'

import ScrollableCardsVue from '@/layouts/ScrollableCards.vue'
import { useSearch } from '@/store/search'
import EmptyIterationVue from '../EmptyIteration.vue'

export default {
  name: 'ListAlbums',
  components: {
    ScrollableCardsVue,
    EmptyIterationVue
  },
  inject: {
    albums: {
      default: () => []
    }
  },
  setup () {
    const { mediaUrl } = useUrls()
    const store = useSearch()
    return {
      mediaUrl,
      store
    }
  },
  methods: {
    goToPage (album) {
      this.store.currentAlbum = album
      this.$router.push({ name: 'album_view', params: { id: '4AcFhqecUgQOUNmdcdngEq' } })
    }
  }
}
</script>

<style scoped>
.card {
  min-width: 150px;
}
</style>
