<doc>
  shows the user his playlists
</doc>

<template>
  <base-detail-page-vue :image="currentPlaylist.cover_image" class="text-light position-relative">
    <template #default>
      <div class="d-flex flex-column justify-content-left">
        <h1 class="display-2 fw-bold">{{ currentPlaylist.name }}</h1>
        <p>{{ $t('k subscribers', { count: 34.4 }) }}</p>

        <!-- Actions -->
        <div class="actions p-3 ps-0 mt-1 text-center rounded shadow-sm w-50 d-flex justify-content-start">
          <v-btn v-if="store._isPlaying" class="text-dark" color="light" rounded @click="store.stopPlaylist">
            <font-awesome-icon icon="fa-solid fa-pause" />
          </v-btn>

          <v-btn v-else class="text-dark" color="light" rounded @click="store.playAll">
            <font-awesome-icon icon="fa-solid fa-play" />
          </v-btn>


          <v-btn class="ms-2 text-dark" color="light" rounded>
            <font-awesome-icon icon="fa-solid fa-heart-circle-check"></font-awesome-icon>
            <!-- <font-awesome-icon icon="fa-solid fa-heart-circle-minus"></font-awesome-icon> -->
          </v-btn>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn class="ms-2 text-dark" color="light" rounded v-bind="props">
                <font-awesome-icon icon="fa-solid fa-circle-info"></font-awesome-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, i) in menuItems" :key="i" :value="index" @click="handlePlaylistActions(item, i)">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn class="ms-2 text-dark" color="light" rounded v-bind="props">
                <font-awesome-icon :icon="['fas', 'sort']"></font-awesome-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, i) in sortingItems" :key="i" :value="index" @click="handleSortingActions(item, i)">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </template>

    <template #content>
      <div class="row my-5">
        <div class="col-12 mb-2">
          <base-card>
            <template #body>
              <v-text-field v-model="song.attributes" :placeholder="$t('Search x songs...', { count: currentPlaylist.songs.length })" variant="solo" elevation="0" hide-details clearable></v-text-field>
              
              <div class="d-flex justify-content-start mt-3">
                <v-switch v-model="displayByGenre" :label="$t('Display by genre')" inset hide-details></v-switch>
                <v-switch :label="$t('Display by year')" inset hide-details></v-switch>
                <v-switch :label="$t('Display by area')" inset hide-details></v-switch>
                <v-switch :label="$t('Display by country')" inset hide-details></v-switch>
              </div>
            </template>
          </base-card>
        </div>

        <div class="col-12">
          <base-categorized-songs-list-group v-if="displayByGenre" :songs="searchSongs" />
          <base-songs-list-group v-else :songs="searchSongs" />
        </div>
        
        <!-- Modals -->
        <teleport to="body">
          <v-dialog v-model="showIntelligentPlaylistModal" width="500">
            <v-card title="Dialog">
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>

              <v-card-actions>
                <v-btn @click="showIntelligentPlaylistModal = false">{{ $t('Close') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </teleport>
      </div>
    </template>
  </base-detail-page-vue>
</template>

<script>
import _ from 'lodash'
import { ref } from 'vue'
import { usePlaylists } from '@/store/playlists'
import { storeToRefs } from 'pinia'

import BaseCard from '@/layouts/bootstrap/cards/BaseCard.vue'
import BaseDetailPageVue from '@/layouts/BaseDetailPage.vue'
import BaseSongsListGroup from '@/layouts/BaseSongsListGroup.vue'
import BaseCategorizedSongsListGroup from '@/layouts/BaseCategorizedSongsListGroup.vue'

export default {
  name: 'PlaylistView',
  components: {
    BaseCard,
    BaseDetailPageVue,
    BaseCategorizedSongsListGroup,
    BaseSongsListGroup
  },
  setup () {
    const store = usePlaylists()
    const { currentPlaylist } = storeToRefs(store)
    const menuItems = [
      'Follow playlist',
      'Intelligent playlist',
      'Rename',
      'Random',
      'Recommend',
      'Mash',
      'Share',
      'Delete',
      'Collaborate'
    ]
    const sortingItems = [
      'Artist name',
      'Song name',
      'Release year',
      'Genre'
    ]

    const showIntelligentPlaylistModal = ref(false)

    return {
      store,
      menuItems,
      sortingItems,
      currentPlaylist,
      showIntelligentPlaylistModal
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
      // Computed method that allows us to search the
      // songs of the current playlist
      if (this.song.attributes === null || this.song.attributes === '') {
        return this.currentPlaylist.songs
      }

      return _.filter(this.currentPlaylist.songs, (song) => {
        return (
          song.name.includes(this.song.attributes) ||
          song.album.name.includes(this.song.attributes) ||
          song.album.artist.name.includes(this.song.attributes) ||
          song.name.toLowerCase().includes(this.song.attributes) ||
          song.album.name.toLowerCase().includes(this.song.attributes) ||
          song.album.artist.name.toLowerCase().includes(this.song.attributes)
        )
      })
    }
  },
  created () {
    this.store.setPlaylist(this.$route.params.id)
  },
  methods: {
    handlePlaylistActions (name, index) {
      // Actions to execute on the playlist
      switch (name) {
        case 'Intelligent playlist':
          this.showIntelligentPlaylistModal = true
          break;
      
        default:
          break;
      }
      index
    },
    async handleSortingActions (name, index) {
      name
      index
    }
  }
}
</script>

<style scoped>
.actions {
  z-index: 10;
  width: auto;
}
</style>
