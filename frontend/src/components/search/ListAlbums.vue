<template>
  <scrollable-cards-vue>
    <template #default>
      <article v-for="album in albums" :key="album.id" class="card bg-dark mx-2">
        <router-link :to="{ name: 'album_view', params: { id: '4AcFhqecUgQOUNmdcdngEq' } }" class="text-light">
          <img :src="mediaUrl(album.cover_image_thumbnail)" :alt="album.artist.name" class="card-img-top">
          <div class="card-body">
            <h6 class="card-title fw-bold">
              {{ album.name }}
            </h6>
            <p class="card-text">2015</p>
          </div>
        </router-link>
      </article>
    </template>
  </scrollable-cards-vue>
</template>

<script>
import { useUrls } from '@/composables/utils'
import ScrollableCardsVue from '@/layouts/ScrollableCards.vue'

export default {
  name: 'ListAlbums',
  components: {
    ScrollableCardsVue
  },
  props: {
    albums: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const { mediaUrl } = useUrls()
    return {
      mediaUrl
    }
  }
}
</script>

<style scoped>
.card {
  min-width: 150px;
}
</style>
