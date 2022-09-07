<template>
  <scrollable-cards-vue v-if="artists.length > 0">
    <template #default>
      <article v-for="i in 14" :key="i" class="card bg-dark mx-2">
        <router-link :to="{ name: 'artist_view', params: { id: '4AcFhqecUgQOUNmdcdngEq' } }" class="text-light">
          <img :src="require('@/assets/avatar6.png')" alt="Jahlys" class="card-img-top">
          <div class="card-body">
            <h6 class="card-title">
              Jahlys
            </h6>
          </div>
        </router-link>
      </article>
    </template>
  </scrollable-cards-vue>

  <empty-iteration-vue v-else content="No artists" />
</template>

<script>
import ScrollableCardsVue from '@/layouts/ScrollableCards.vue'
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
}
</script>

<style scoped>
.card {
  min-width: 150px;
}
</style>
