<doc>
  Shows the user the playlists that he created
</doc>

<template>
  <section id="playlists" class="p-5">
    <div class="row">
      <div class="col-12">
        <button v-for="(choice, i) in displayChoices" :key="i" :class="[choice.component === activeComponent ? 'active' : null, { 'mx-2': i > 0 }]" type="button" class="btn btn-light" @click="activeComponent = choice.component">
          {{ $t(choice.name) }}
        </button>
      </div>

      <div v-if="activeComponent === 'list-playlists-vue'" class="col-12 mt-4">
        <v-btn color="primary" rounded @click="handleCreatePlaylist">
          <font-awesome-icon icon="fa-solid fa-plus" class="me-2" />
          {{ $t('Create playlist') }}
        </v-btn>
      </div>

      <component :is="activeComponent" :user-playlists="true" />
    </div>
  </section>
</template>

<script>
import { usePlaylists } from '@/store/playlists'
  
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
  emits: {
    'display-alert': () => true
  },
  setup () {
    const store = usePlaylists()
    return {
      store
    }
  },
  data () {
    return {
      displayChoices: [
        { name: 'Playlists', component: 'list-playlists-vue' },
        { name: 'Artists', component: 'list-artists-vue' },
        { name: 'Albums', component: 'list-albums-vue' }
      ],
      activeComponent: 'list-playlists-vue'
    }
  },
  methods: {
    async handleCreatePlaylist () {
      // Handles the creation of a 
      // new playlist
      try {
        const response = await this.$http.post('playlists/create')
        this.$session.listPush('playlists', response.data)
        this.store.loadFromCache(true)
        // this.$emit('display-alert', 'success', 'Playlist created', response)
      } catch (error) {
        // this.$emit('display-alert', 'error', 'PLA-CRE', error.message)
        // pass
      }
    }
  }
}
</script>
