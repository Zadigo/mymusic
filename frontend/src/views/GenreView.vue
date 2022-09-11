<template>
  <section id="genre">
    <div class="container my-5">
      <div class="row">
        <div class="col-12 text-light">
          <h2 class="display-3 fw-bold">Dancehall</h2>
          <!-- <div class="card shadow-none bg-transparent">
            <div class="card-body">
            </div>
          </div> -->
        </div>

        <div class="col-12">
          <base-section-vue name="Playlists">
            <list-playlists-vue :other-playlist="playlists.top" />
          </base-section-vue>
          
          <base-section-vue name="Novelties" class="my-2">
            <list-playlists-vue :other-playlist="playlists.newest" />
          </base-section-vue>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import BaseSectionVue from '@/layouts/BaseSection.vue'
import ListPlaylistsVue from '@/components/playlists/ListPlaylists.vue'

export default {
  name: 'GenreView',
  components: {
    BaseSectionVue,
    ListPlaylistsVue
  },
  data () {
    return {
      playlists: []
    }
  },
  created () {
    this.getPlaylists()
  },
  methods: {
    async getPlaylists () {
      try {
        const response = await this.$http.get(`playlists/${this.$route.params.genre}`)
        this.playlists = response.data
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>
