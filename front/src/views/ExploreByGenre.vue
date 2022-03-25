<template>
  <section id="genre">
    <h1 :aria-label="currentGenre">
      {{ currentGenre }}
    </h1>

    <div class="row">
      <div class="col-12">
        <base-list-playlists :playlists="[]" :novelties="[]" />
      </div>
    </div>
  </section>
</template>

<script>
import BaseListPlaylists from '../components/BaseListPlaylists.vue'

export default {
  name: 'ExploreByGenre',

  components: { BaseListPlaylists },

  data: () => ({
    currentGenre: null,
    result: {
      playlists: [],
      novelties: []
    }
  }),

  beforeMount() {
    this.currentGenre = this.$route.params.genre
    this.getPlaylists()
  },

  methods: {
    async getPlaylists() {
      try {
        var response = await this.$axios.get(`/playlists/${this.currentGenre}`)
        this.result = response.data
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>
