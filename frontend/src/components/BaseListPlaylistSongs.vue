<template>
  <div class="list-group">
    <div v-for="song in songs" :key="song.id" class="list-group-item d-flex justify-content-between align-items-center">
      <div class="row align-items-center">
        <div class="col-auto">
          <button v-if="isPlaying && isCurrentSong(song)" class="btn btn-sm btn-primary" type="button" @click="pauseSong(song)">
            <span class="mdi mdi-pause" />
          </button>

          <button v-else class="btn btn-sm btn-primary" type="button" @click="playSong(song)">
            <!-- <span class="mdi mdi-play" /> -->
            
          </button>
        </div>

        <div class="col-auto">
          <img src="" alt="">
          <div class="d-flex flex-column">
            <span>{{ song.name }}</span>
            <router-link :to="{ name: 'artist_view', params: { id: 'nnoin' } }" class="text-muted">{{ song.album.artist.name }}</router-link>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-auto">
          <button type="button" class="btn btn-sm btn-primary">
            <span class="mdi mdi-heart" />
          </button>

          <time datetime="13:00" class="mx-2">{{ song.duration }}</time>

          <button type="button" class="btn btn-sm btn-primary">
            <span class="mdi mdi-dots-vertical" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePlayer } from '../store/player'
import { mediaUrl } from '@/utils'
import { storeToRefs } from 'pinia'

export default {
  name: 'BasePlaylistSongs',
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  emits: ['play', 'pause'],
  setup () {
    const player = usePlayer()
    const { isPlaying, currentSong } = storeToRefs(player)
    return {
      player,
      mediaUrl,
      isPlaying,
      currentSong
    }
  },
  computed: {},
  watch: {},
  methods: {
    isCurrentSong (song) {
      return song.id === this.currentSong.id
    },
    playSong (song) {
      this.player.play(song)
      this.$emit('play', song)
    },
    pauseSong (song) {
      this.player.pause()
      this.$emit('pause', song)
    }
  }
}
</script>
