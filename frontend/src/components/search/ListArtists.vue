<template>
  <scrollable-cards-vue>
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
</template>

<script>
import ScrollableCardsVue from '@/layouts/ScrollableCards.vue'

export default {
  name: 'ListAlbums',
  components: {
    ScrollableCardsVue
  }
}
</script>

<style scoped>
.card {
  min-width: 150px;
}
</style>
