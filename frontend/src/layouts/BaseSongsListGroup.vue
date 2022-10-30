<doc>
  List a set of songs 
</doc>

<template>
  <div class="list-group">
    <!-- TODO: Make this reusable componenent -->
    <a v-for="song in songs" :key="song.id" href class="list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center" @click.prevent>
      <div class="d-flex flex-column">
        <span>
          {{ song.name }}
          <font-awesome-icon icon="fa-solid fa-e" class="ms-3" />
        </span>

        <router-link :to="{ name: 'artist_view', params: { id: song.album.artist.id } }" class="text-muted text-decoration">
          {{ song.album.artist.name }}
        </router-link>
      </div>

      <div class="btn-group">
        <button v-if="isPlaying && store.isCurrentSong(song)" type="button" class="btn btn-primary btn-sm" @click="store.pause">
          <font-awesome-icon icon="fa-solid fa-pause" />
        </button>

        <button v-else type="button" class="btn btn-primary btn-sm" @click="store.play(song)">
          <font-awesome-icon icon="fa-solid fa-play" />
        </button>

        <button type="button" class="btn btn-primary btn-sm">
          <font-awesome-icon icon="fa-solid fa-heart" />
        </button>

        <!-- <button type="button" class="btn btn-primary btn-sm">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"></font-awesome-icon>
        </button> -->
        <base-dropdown-button id="options" :items="[{ name: 'Google' }]" size="sm" />
      </div>
    </a>
  </div>
</template>

<script>
import { usePlayer } from '@/store/player'
import { storeToRefs } from 'pinia'

import BaseDropdownButton from '@/layouts/bootstrap/BaseDropdownButton.vue'

export default {
  name: 'BaseSongsListGroup',
  components: {
    BaseDropdownButton
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
    return {
      store,
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
