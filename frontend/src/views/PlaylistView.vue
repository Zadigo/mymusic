<template>
  <section id="playlist" class="mb-5">
    <header ref="link">
      <div id="playlist-header" class="row p-5 mb-5 text-white">
        <div class="col-5">
          <img :src="mediaUrl(store.currentPlaylist.cover_image)" :alt="store.currentPlaylist.name" class="img-fluid rounded shadow">
        </div>

        <div class="col-auto">
          <h1 class="fw-bold">{{ store.currentPlaylist.name }}</h1>
          <p class="font-weight-bold">{{ $t('by', { username: store.currentPlaylist.author.username }) }}</p>
          <p class="text-muted">{{ $tc('songs', store.currentPlaylist.songs.length) }} / {{ $tc('followers', store.currentPlaylist.number_of_followers) }}</p>

          <button v-if="isPlaying" type="button" class="btn btn-light" @click="store.stopPlaylist()">
            Pause
          </button>

          <button v-else type="button" class="btn btn-light" @click="store.playAll()">
            Play all
          </button>
        </div>
      </div>
    </header>

    <div class="row px-5">
      <div class="col-9">
        <input v-model="search" type="search" class="form-control p-2" placeholder="Search playlist by song name, genre, artist name...">
      </div>

      <div class="col-auto">
        <!-- Sort -->
        <!-- More options -->
        More
      </div>

      <div class="col-12 my-2">
        <button type="button" class="btn btn-primary" @click="showAdvancedSearch = !showAdvancedSearch">
          Advanced search
        </button>

        <!-- Select search by genre -->
      </div>

      <div class="col-12">
        <base-list-playlist-songs-vue :songs="searchedSongs" @play="confirmSearch" />
      </div>

      <div v-if="songs.length > 0" class="col-12 mt-4">
        <h3 class="text-white">Recommandations</h3>
        <base-list-playlist-songs-vue :songs="recommendations" />
      </div>

      <div v-else class="col-12 mt-4">
        <h3 class="text-white">Cherchons du contenu à ajouter à votre playlist</h3>
        <input type="text" class="form-control p-2" placeholder="Search titles or episodes">
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { usePlaylists } from '../store/playlists'
import { usePlayer } from '../store/player'
import { mapState } from 'pinia'
import { mediaUrl } from '@/utils'

import BaseListPlaylistSongsVue from '../components/BaseListPlaylistSongs.vue'

export default {
  name: 'PlaylistView',
  components: {
    BaseListPlaylistSongsVue
  },
  setup () {
    const store = usePlaylists()
    return {
      mediaUrl,
      store
    }
  },
  data: () => ({
    search: null,
    showAdvancedSearch: false,
    recommendations: []
  }),
  computed: {
    ...mapState(usePlayer, ['isPlaying']),
    songs () {
      // TODO: There's an error on the API .songs are albums
      const items = _.map(this.store.currentPlaylist.songs, (song) => {
        const data = {}
        _.forEach(song.album.song_set, (item) => {
          data.id = song.id
          data.name = song.name
          data.song_file = song.song_file
          data.genre = item.genre
          data.album = song.album
          data.duration = item.duration
        })
        return data
      })
      return items
    },
    searchedSongs () {
      if (!this.search) {
        return this.songs
      }
      return _.filter(this.songs, (song) => {
        const truthArray = []
        truthArray.push(song.name === this.search || song.name.includes(this.search))
        truthArray.push(song.name.toLowerCase() === this.search || song.name.toLowerCase().includes(this.search))

        truthArray.push(song.genre === this.search || song.genre.includes(this.search))
        truthArray.push(song.genre.toLowerCase() === this.search || song.genre.toLowerCase().includes(this.search))
        
        truthArray.push(song.album.artist.name === this.search || song.album.artist.name.includes(this.search))
        truthArray.push(song.album.artist.name.toLowerCase() === this.search || song.album.artist.name.toLowerCase().includes(this.search))
        
        return _.some(truthArray, (item) => item === true)
      })
    }
  },
  created () {
    this.store.setPlaylist(this.$route.params.id)
  },
  mounted () {
    this.$refs.link.style.backgroundColor = `#${this.store.currentPlaylist.background_color}`
    setTimeout(() => {
      this.getRecommendations()
    }, 1000)
  },
  methods: {
    async getRecommendations () {

    },

    confirmSearch () {
      // If we have a search on the playlist,
      // store what the user searched for
      if (this.search) {
        this.$session.updateArray('search', this.search)
      }
    }
  }
}
</script>

<style scoped>

header {
  box-shadow: 0 0 0 #b9c6d9, 0 0 0 white, 0 0 0 white,  inset 0rem -5rem 9rem 0px white;
}
</style>
