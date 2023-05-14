<template>
  <base-detail-page-vue :image="currentArtist.cover_image" class="text-light position-relative">
    <template #default>
      <div class="d-flex flex-column w-50 justify-content-start">
        <h1 class="display-2 fw-bold">{{ currentArtist.name }}</h1>
        <p>{{ $t('k subscribers', { count: 34.4 }) }}</p>

        <div class="rounded">
          <div class="btn-group shadow-none">
            <button type="button" class="btn btn-light" @click="playlists.playAll">
              <font-awesome-icon icon="fa-solid fa-play" />
            </button>

            <button type="button" class="btn btn-light" @click="followArtist(currentArtist.id)">
              <font-awesome-icon icon="fa-solid fa-heart-circle-check" />
              <!-- <font-awesome-icon icon="fa-solid fa-heart-circle-minus" /> -->
            </button>

            <button type="button" class="btn btn-light">
              <font-awesome-icon icon="fa-solid fa-circle-info" />
            </button>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="row my-5">
        <div class="col-12 mb-2">
          <div class="card bg-dark text-light">
            <div class="card-body">
              <input v-model="search" :placeholder="$t('Search x songs...', { count: 0 })" type="text" class="form-control p-2">
            </div>
          </div>
        </div>
        
        <!-- Songs, Albums -->
        <div class="col-12">
          <base-section-vue :name="$t('Discography')" class="mt-5">
            <template #default>
              <!-- Pills -->
              <base-nav-pills :pills="filters" @pill-click="selectFilter" />
              
              <!-- Albums -->
              <base-albums-songs-list-group :albums="currentArtist.album_set" :search="search" :filter-by="selectedFilter" class="mt-3" />
            </template>
          </base-section-vue>
        </div>

        <div class="col-12">
          <base-section-vue :name="$t('With', { artist: currentArtist.name })" class="mt-2">
            <template #default>
              <!-- TODO: Add something here -->
            </template>
          </base-section-vue>
        </div>
      </div>
    </template>
  </base-detail-page-vue>
</template>

<script>
import { storeToRefs } from 'pinia'
import { usePlaylists } from '@/store/playlists'
import { useSearch } from '@/store/search'
import { useUrls } from '@/composables/utils'
import { useArtistComposable } from '@/composables/artist'

import BaseDetailPageVue from '@/layouts/BaseDetailPage.vue'
import BaseSectionVue from '@/layouts/BaseSection.vue'
// import BaseSongsListGroupVue from '@/layouts/BaseSongsListGroup.vue'
import BaseAlbumsSongsListGroup from '@/layouts/BaseAlbumsSongsListGroup.vue'
import BaseNavPills from '../layouts/BaseNavPills.vue'
import { getCurrentInstance } from 'vue'


export default {
  name: 'ArtistView',
  components: {
    BaseDetailPageVue,
    BaseSectionVue,
    // BaseSongsListGroupVue,
    BaseAlbumsSongsListGroup,
    BaseNavPills
},
  setup () {
    const app = getCurrentInstance()
    const playlists = usePlaylists()
    const store = useSearch()
    const { currentArtist } = storeToRefs(store)
    const { mediaUrl } = useUrls()
    const { followArtist } = useArtistComposable(app)
    return {
      store,
      currentArtist,
      playlists,
      followArtist,
      mediaUrl
    }
  },
  data () {
    return {
      search: null,
      selectedFilter: null,
      filters: ['All', 'Albums', 'Singles', 'Mixtapes', 'Riddims']
    }
  },
  created () {
    this.playlists.loadFromCache()
    this.getArtist()
  },
  mounted () {
    this.store.currentArtist = this.sessionStorage.currentArtist
  },
  methods: {
    async getArtist () {
      try {
        const response = await this.$http.post(`artists/${this.$route.params.id}`)
        this.$session.create('currentArtist', response.data)
      } catch (error) {
        console.error(error)
      }
    },
    selectFilter (value) {
      this.selectedFilter = value
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
