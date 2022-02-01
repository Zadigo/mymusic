<template>
  <section id="genre">
    <h1 :aria-label="currentGenre">{{ currentGenre }}</h1>

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

  data () {
    return {
      currentGenre: null
    }
  },

  beforeMount() {
    this.currentGenre = this.$route.params.genre
  },
}
</script>
