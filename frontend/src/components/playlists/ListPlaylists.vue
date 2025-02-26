<doc>
  Lists the songs for a given playlist
</doc>

<template>
  <div class="col-12 my-3">
    <!-- TODO: Make this independent from the store so that
    any component can require an iteration of playlists from
    any source -->
    <div v-if="playlists.length > 0" class="row">
      <!-- Playlist -->
      <article v-for="playlist in playlists" :key="playlist.id" class="col-sm-12 col-md-4">
        <div class="card my-2">
          <router-link :to="handlePlaylistLink(playlist)" :aria-label="playlist.name" class="text-decoration-none text-white">
            <img :src="mediaUrl(playlist.cover_image)" :alt="playlist.name" class="card-img-top">
          </router-link>

          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <router-link :to="handlePlaylistLink(playlist)" :aria-label="playlist.name" class="text-decoration-none text-white">
                <h4 class="fw-bold card-title mb-1">{{ playlist.name }}</h4>
              </router-link>
  
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn id="btn-playlist-actions" class="mb-1" variant="tonal" color="light" density="compact" rounded v-bind="props">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                  </v-btn>
                </template>
  
                <v-list>
                  <v-list-item v-for="(menuItem, i) in menuItems" :key="i" :value="index" @click="handleMenuSelection(playlist, menuItem, i)">
                    <v-list-item-title>{{ menuItem }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <p v-if="userPlaylists" class="card-text text-body-secondary m-0">{{ $t('Created by', { user: playlist.author.username }) }}</p>
            <p v-else class="card-text text-body-secondary m-0">{{ $t('Created by', { user: 'spotify' }) }}</p>
          </div>
        </div>
      </article>
    </div>

    <empty-iteration v-else class="py-5 my-5" content="There are no playlists available" />
  </div>
</template>

<script>
import { useUrls } from '@/composables/utils'
import { usePlaylists } from '../../store/playlists'
import usePlaylistComposable from '@/composables/playlists'

import EmptyIteration from '../EmptyIteration.vue'

export default {
  name: 'ListPlaylists',
  components: {
    EmptyIteration
  },
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
    const menuItems = [
      'Play all',
      // 'Share',
      // 'Recommend',
      // 'Mash',
      'Delete'
    ]
    const { getUserPlaylists, deletePlaylist } = usePlaylistComposable()

    return {
      store,
      menuItems,
      mediaUrl,
      deletePlaylist,
      getUserPlaylists
    }
  },
  computed: {
    playlists () {
      // return this.userPlaylists ? this.store.playlists : this.otherPlaylist
      if (this.store.hasPlaylists) {
        return this.store.playlists
      } else {
        return this.otherPlaylist
      }
    }
  },
  created () {
    if (this.userPlaylists) {
      this.handleGetUserPlaylists()
    }
  },
  methods: {
    handleGetUserPlaylists () {
      // Returns all the playlists of the
      // current user
      if (this.$session.exists('playlists')) {
        this.store.playlists = this.sessionStorage.playlists
      } else {
        this.getUserPlaylists((data) => {
          this.store.$patch((state) => {
            state.playlists = data
            this.$session.create('hasPlaylists', true)
            this.$session.create('playlists', data)
          })
        })
      }
    },  
    handleMenuSelection (playlist, menuItem) {
      switch (menuItem) {
        case 'Delete':
          this.deletePlaylist(playlist, (data) => {
            console.log(data)
          })
          break
      
        default:
          break
      }
    },
    handlePlaylistLink (playlist) {
      // Navigate to the given playlist
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
