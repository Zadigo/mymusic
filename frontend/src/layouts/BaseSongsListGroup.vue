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
            <v-list-item v-for="(item, i) in menuItems" :key="i" :value="item" @click="handlePlaylistMenu(item, i)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayer } from '@/store/player'
import { storeToRefs } from 'pinia'

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
    const store = usePlayer()
    const { isPlaying } = storeToRefs(store)
    const menuItems = [
      'Save to playlist',
      'Share',
      'Recommend',
      'Remove'
    ]

    return {
      store,
      menuItems,
      isPlaying
    }
  }
}
</script>

<style scoped>
button {
  width: 40px;
}
</style>
