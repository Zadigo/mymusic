<template>
  <div v-if="!byGenre" class="list-group">
    <!-- TODO: Make this reusable componenent -->
    <a v-for="song in songs" :key="song.id" href class="list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center" @click.prevent>
      <div class="d-flex flex-column">
        <span>
          {{ song.name }}
          <font-awesome-icon icon="fa-solid fa-e" class="ms-3" />
        </span>

        <router-link :to="{ name: 'artist_view', params: { id: 'nnoin' } }" class="text-muted text-decoration">
          {{ song.album.artist.name }}
        </router-link>
      </div>

      <div class="btn-group">
        <button v-if="isPlaying && store.isCurrentSong(song)" type="button" class="btn btn-primary btn-sm" @click="store.pause">
          <font-awesome-icon icon="fa-solid fa-pause"></font-awesome-icon>
        </button>

        <button v-else type="button" class="btn btn-primary btn-sm" @click="store.play(song)">
          <font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon>
        </button>

        <button type="button" class="btn btn-primary btn-sm">
          <font-awesome-icon icon="fa-solid fa-heart"></font-awesome-icon>
        </button>

        <button type="button" class="btn btn-primary btn-sm">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"></font-awesome-icon>
        </button>
      </div>
    </a>
  </div>
</template>

<script>
import { usePlayer } from '@/store/player'
import { storeToRefs } from 'pinia'

export default {
  name: 'BaseSongsListGroup',
  props: {
    byGenre: {
      type: Boolean,
      default: false
    },
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
