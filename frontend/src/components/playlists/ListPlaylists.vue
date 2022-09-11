<template>
  <div class="col-12 my-3">
    <!-- TODO: Make this independent from the store so that
    any component can require an iteration of playlists from
    any source -->
    <div v-if="playlists.length > 0" class="row">
      <article v-for="playlist in playlists" :key="playlist.id" class="col-sm-12 col-md-4">
        <router-link :to="navigateToPlaylist(playlist)" :aria-label="playlist.name" class="text-decoration-none text-white">
          <div class="card my-2">
            <img :src="mediaUrl(playlist.cover_image)" :alt="playlist.name" class="card-img-top">
            <div class="card-body">
              <h4 class="fw-bold card-title">{{ playlist.name }}</h4>
              <p v-if="userPlaylists" class="card-text text-muted m-0">{{ $t('Created by', { user: playlist.author.username }) }}</p>
              <p v-else class="card-text text-muted m-0">{{ $t('Created by', { user: 'spotify' }) }}</p>
            </div>
          </div>
        </router-link>
      </article>
    </div>

    <empty-iteration-vue v-else class="py-5 my-5" content="There are no playlists available" />
  </div>
</template>

<script>
import { useUrls } from '@/composables/utils'
import { usePlaylists } from '../../store/playlists'

import EmptyIterationVue from '../EmptyIteration.vue'

export default {
  name: 'ListPlaylists',
  components: { EmptyIterationVue },
  inject: {
    darkMode: ['darkMode']
  },
  props: {
    userPlaylists: {
      type: Boolean
    },
    otherPlaylist: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const store = usePlaylists()
    const { mediaUrl } = useUrls()
    return {
      store,
      mediaUrl
    }
  },
  computed: {
    playlists () {
      return this.userPlaylists ? this.store.playlists : this.otherPlaylist
    }
  },
  created () {
    if (this.userPlaylists) {
      this.getUserPlaylists()
    }
  },
  methods: {
    async getUserPlaylists () {
      try {
        if (!this.sessionStorage.hasPlaylists) {
          const response = await this.$http.get('playlists')
          this.store.$patch((state) => {
            state.playlists = response.data
  
            this.$session.create('hasPlaylists', true)
            this.$session.create('playlists', response.data)
          })
        } else {
          this.store.playlists = this.sessionStorage.playlists
        }
      } catch (error) {
        // this.$refs.alert.showAlert('error', error.message, 'PLA-RE')
        console.error(error)
      }
    },
    navigateToPlaylist (playlist) {
      this.store.setPlaylist(playlist.id)
      return { name: 'playlist_view', params: { id: playlist.id } }
    }
  }
}
</script>

<style scoped>
.card {
  transition: all .3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}

.card .card-img-top {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, .175) !important;
}

.card:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
