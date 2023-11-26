<doc>
  List a set of songs 
</doc>

<template>
  <div class="list-group">
    <!-- TODO: Make this reusable componenent -->
    <div v-for="song in songs" :key="song.id" href class="list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center p-3" @click.prevent>
      <div class="d-flex flex-column">
        <span>
          {{ song.name }}
          <font-awesome-icon icon="fa-solid fa-e" class="ms-3" />
        </span>

        <router-link :to="{ name: 'artist_view', params: { id: song.album.artist.id } }" class="text-body-secondary text-decoration">
          {{ song.album.artist.name }}
        </router-link>
      </div>

      <div class="btn-group">
        <v-btn v-if="isPlaying && store.isCurrentSong(song)" variant="tonal" color="light" rounded @click="store.pause">
          <font-awesome-icon icon="fa-solid fa-pause" />
        </v-btn>

        <v-btn v-else variant="tonal" color="light" rounded @click="store.play(song)">
          <font-awesome-icon icon="fa-solid fa-play" />
        </v-btn>

        <v-btn class="ms-2" variant="tonal" color="light" rounded>
          <font-awesome-icon :icon="['fas', 'heart']" />
        </v-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="ms-2" variant="tonal" color="light" rounded v-bind="props">
              <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(menuItem, i) in menuItems" :key="i" :value="item" @click="handleSongMenu(song, menuItem, i)">
              <v-list-item-title>{{ menuItem }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <Teleport to="body">
      <v-dialog id="add-to-playlist" v-model="showAddToPlaylistModal" width="300">
        <v-card title="Dialog">
          <v-card-text>
            <v-select v-model="requestParams.playlist" label="Select a playlist" :items="playlistsStore.playlistNames" item-title="name" item-value="id" variant="outlined" return-object clearable multiple></v-select>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="handleCloseSongToPlaylistModal">{{ $t('Close') }}</v-btn>
            <v-btn @click="addSongToPlaylist">{{ $t('Save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </Teleport>
  </div>
</template>

<script>
import { usePlayer } from '@/store/player'
import { usePlaylists } from '@/store/playlists'
import usePlaylistComposable from '@/composables/playlists'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// import BaseDropdownButton from '@/layouts/bootstrap/BaseDropdownButton.vue'

export default {
  name: 'BaseSongsListGroup',
  components: {
    // BaseDropdownButton
  },
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const playerStore = usePlayer()
    const { isPlaying } = storeToRefs(playerStore)
    const playlistsStore = usePlaylists()
    const { addSongToPlaylist } = usePlaylistComposable()
    const menuItems = [
      'Save to playlist',
      // 'Share',
      // 'Recommend',
      // 'Remove'
    ]
    const showAddToPlaylistModal = ref(false)

    return {
      playerStore,
      playlistsStore,
      menuItems,
      showAddToPlaylistModal,
      isPlaying,
      addSongToPlaylist
    }
  },
  data () {
    return {
      requestParams: {
        playlists: []
      }
    }
  },
  methods: {
    handleCloseSongToPlaylistModal () {
      this.showAddToPlaylistModal = false
      this.requestParams.playlists = []
    },
    handleAddSongToPlaylist (song) {
      // Allows the user to add a song to a playlist
      this.addSongToPlaylist(this.requestParams.playlistId, song.id, (data) => {
        console.log(data)
      })
    },
    handleSongMenu (song, menuItem) {
      // Allows the user to run multiple actions
      // on a song using the song menu
      song
      switch (menuItem) {
        case 'Save to playlist':
          this.showAddToPlaylistModal = true
          break

        default:
          break
      }
    }
  }
}
</script>

<style scoped>
button {
  width: 40px;
}
</style>
