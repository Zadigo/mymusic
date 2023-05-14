<template>
  <div class="row mt-4">
    <div v-for="artist in followedArtists" :key="artist.id" class="col-3">
      <router-link :to="{ name: 'artist_view', params: { id: artist.id } }" :aria-label="artist.name" class="text-decoration-none text-white">
        <base-template-card>
          <div class="card-body text-center">
            <img :src="mediaUrl(artist.cover_image)" :alt="artist.name" class="img-fluid rounded-circle">
            <h4 class="m-0 mt-3">{{ artist.name }}</h4>
          </div>
        </base-template-card>
      </router-link>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue'
import { useUrls } from '@/composables/utils'

import BaseTemplateCard from '@/layouts/bootstrap/cards/BaseTemplateCard.vue'

export default {
  name: 'ListArtists',
  components: {
    BaseTemplateCard
  },
  setup () {
    const followedArtists = ref([])
    const { mediaUrl } = useUrls()
    return {
      followedArtists,
      mediaUrl
    }
  },
  // created () {
  //   this.followedArtists = this.$session.getOrCreate('followedArtists', [])
  // },
  mounted () {
    this.getFollowedArtists()
  },
  methods: {
    async getFollowedArtists () {
      try {
        const response = await this.$http.get('/artists/followed')
        this.followedArtists = response.data
        this.$session.create('followedArtists', response.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
