<template>
  <scrollable-cards-vue v-if="artists.length > 0">
    <template #default>
      <article v-for="artist in artists" :key="artist.id" class="card bg-dark mx-2">
        <a href class="text-light" @click.prevent="goToPage(artist)">
          <img :src="mediaUrl(artist.cover_image_thumbnail)" :alt="artist.name" class="card-img-top">
          <div class="card-body">
            <h6 class="card-title">
              {{ artist.name }}
            </h6>
          </div>
        </a>
      </article>
    </template>
  </scrollable-cards-vue>

  <empty-iteration-vue v-else content="No artists" />
</template>

<script>
import { useUrls } from '@/composables/utils'
import ScrollableCardsVue from '@/layouts/ScrollableCards.vue'
import { useSearch } from '@/store/search'
import EmptyIterationVue from '../EmptyIteration.vue'

export default {
  name: 'ListArtists',
  components: {
    ScrollableCardsVue,
    EmptyIterationVue
  },
  inject: {
    artists: {
      default: () => []
    }
  },
  setup () {
    const store = useSearch()
    const { mediaUrl } = useUrls()
    return {
      store,
      mediaUrl
    }
  },
  methods: {
    goToPage (artist) {
      this.store.currentArtist = artist
      this.$router.push({ name: 'artist_view', params: { id: artist.id } })
    }
  }
}
</script>

<style scoped>
.card {
  min-width: 150px;
}
</style>
