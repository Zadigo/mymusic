<template>
  <section id="playlists" class="p-5">
    <div class="row">
      <div class="col-12">
        <button v-for="(choice, i) in displayChoices" :key="i" :class="[choice.component === activeComponent ? 'active' : null, { 'mx-2': i > 0 }]" type="button" class="btn btn-light" @click="activeComponent = choice.component">
          {{ choice.name }}
        </button>
      </div>

      <div class="col-12 mt-4">
        <button type="button" class="btn btn-primary" @click="create">
          <font-awesome-icon icon="fa-solid fa-plus" class="me-2" />
          Create playlist
        </button>
      </div>

      <component :is="activeComponent" />
    </div>
  </section>
</template>

<script>
import ListArtistsVue from '../components/playlists/ListArtists.vue'
import ListAlbumsVue from '../components/playlists/ListAlbums.vue'
import ListPlaylistsVue from '../components/playlists/ListPlaylists.vue'

export default {
  name: 'PlaylistsView',
  components: {
    ListArtistsVue,
    ListAlbumsVue,
    ListPlaylistsVue
  },
  data: () => ({
    displayChoices: [
      { name: 'playlists', component: 'list-playlists-vue' },
      { name: 'artists', component: 'list-artists-vue' },
      { name: 'albums', component: 'list-albums-vue' }
    ],
    activeComponent: 'list-playlists-vue'
  }),
  methods: {
    async create () {

    }
  }
}
</script>
