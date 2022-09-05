<template>
  <base-detail-page-vue class="text-light position-relative">
    <template #default>
      <div class="d-flex flex-column justify-content-start">
        <h1 class="display-2 fw-bold">{{ currentPlaylist.name }}</h1>
        <p>34.4k abonnés</p>

        <div class="actions p-3 mt-1 bg-white text-center rounded shadow-sm">
          <button v-if="store.isPlaying" type="button" class="btn btn-light shadow-none" @click="store.stopPlaylist">
            <font-awesome-icon icon="fa-solid fa-pause"></font-awesome-icon>
          </button>

          <button v-else type="button" class="btn btn-light shadow-none" @click="store.playAll">
            <font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon>
          </button>


          <button type="button" class="btn btn-light mx-2 shadow-none">
            <font-awesome-icon icon="fa-solid fa-heart-circle-check"></font-awesome-icon>
            <!-- <font-awesome-icon icon="fa-solid fa-heart-circle-minus"></font-awesome-icon> -->
          </button>

          <button type="button" class="btn btn-light mx-2 shadow-none">
            <font-awesome-icon icon="fa-solid fa-circle-info"></font-awesome-icon>
          </button>
        </div>
      </div>
    </template>

    <template #content>
      <div class="row my-5">
        <div class="col-12 mb-2">
          <div class="card bg-dark text-light">
            <div class="card-body">
              <input v-model="song.attributes" :placeholder="`Search ${currentPlaylist.songs.length} songs...`" type="text" class="form-control p-2">

              <div class="form-check form-switch">
                <input id="by-genre" v-model="displayByGenre" class="form-check-input" type="checkbox" role="switch">
                <label class="form-check-label" for="by-genre">
                  Display by genre
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <!-- <base-songs-list-group-vue :songs="currentPlaylist.songs" /> -->
          <base-categorized-songs-list-group-vue v-if="displayByGenre" :songs="searchSongs" />
          <base-songs-list-group-vue v-else :songs="searchSongs" />
        </div>
      </div>
    </template>
  </base-detail-page-vue>
</template>

<script>
import _ from 'lodash'
import { usePlaylists } from '@/store/playlists'
import { storeToRefs } from 'pinia'

import BaseDetailPageVue from '@/layouts/BaseDetailPage.vue'
import BaseSongsListGroupVue from '@/layouts/BaseSongsListGroup.vue'
import BaseCategorizedSongsListGroupVue from '@/layouts/BaseCategorizedSongsListGroup.vue'

export default {
  name: 'PlaylistView',
  components: {
    BaseDetailPageVue,
    BaseCategorizedSongsListGroupVue,
    BaseSongsListGroupVue
  },
  setup () {
    const store = usePlaylists()
    const { currentPlaylist } = storeToRefs(store)
    return {
      store,
      currentPlaylist
    }
  },
  data () {
    return {
      displayByGenre: false,
      song: {
        attributes: null
      }
    }
  },
  computed: {
    searchSongs () {
      if (this.song.attributes === null || this.song.attributes === '') {
        return this.currentPlaylist.songs
      }

      return _.filter(this.currentPlaylist.songs, (song) => {
        return (
          song.name.includes(this.song.attributes) ||
          song.album.name.includes(this.song.attributes) ||
          song.album.artist.name.includes(this.song.attributes)
        )
      })
    }
  },
  created () {
    this.store.setPlaylist(this.$route.params.id)
  }
}
</script>

<style scoped>
.actions {
  z-index: 10;
  width: auto;
}
</style>
