<template>
  <scrollable-cards-vue>
    <template #default>
      <article v-for="i in 14" :key="i" class="card bg-dark mx-2">
        <router-link :to="{ name: 'album_view', params: { id: '4AcFhqecUgQOUNmdcdngEq' } }" class="text-light">
          <img :src="require('@/assets/cover.jpg')" alt="Jahlys" class="card-img-top">
          <div class="card-body">
            <h6 class="card-title fw-bold">
              Jahlys
            </h6>
            <p class="card-text">2015</p>
          </div>
        </router-link>
      </article>
    </template>
  </scrollable-cards-vue>
</template>

<script>
import ScrollableCardsVue from '@/layouts/ScrollableCards.vue'

export default {
  name: 'ListPlaylists',
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
