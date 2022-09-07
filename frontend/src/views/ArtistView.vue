<template>
  <base-detail-page-vue :image="currentArtist.cover_image" class="text-light position-relative">
    <template #default>
      <div class="d-flex flex-column w-50 justify-content-start">
        <h1 class="display-2 fw-bold">{{ currentArtist.name }}</h1>
        <p>34.4k abonnés</p>

        <div class="rounded">
          <div class="btn-group shadow-none">
            <button type="button" class="btn btn-light" @click="playlists.playAll">
              <font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon>
            </button>

            <button type="button" class="btn btn-light">
              <font-awesome-icon icon="fa-solid fa-heart-circle-check"></font-awesome-icon>
              <!-- <font-awesome-icon icon="fa-solid fa-heart-circle-minus"></font-awesome-icon> -->
            </button>

            <button type="button" class="btn btn-light">
              <font-awesome-icon icon="fa-solid fa-circle-info"></font-awesome-icon>
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
              <input type="text" class="form-control p-2" placeholder="Search 154 songs...">
            </div>
          </div>
        </div>

        <div class="col-12">
          <base-songs-list-group-vue />
        </div>

        <div class="col-12">
          <base-section-vue name="Discography" class="mt-5">
            <template #default>
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link active" href>Albums</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href>Singles</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href>Mixtapes</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href>Riddims</a>
                </li>
              </ul>
            </template>
          </base-section-vue>
        </div>

        <div class="col-12">
          <base-section-vue name="With Jahlys" class="mt-2">
            <template #default>

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

import BaseDetailPageVue from '@/layouts/BaseDetailPage.vue'
import BaseSectionVue from '@/layouts/BaseSection.vue'
import BaseSongsListGroupVue from '@/layouts/BaseSongsListGroup.vue'


export default {
  name: 'ArtistView',
  components: {
    BaseDetailPageVue,
    BaseSectionVue,
    BaseSongsListGroupVue
  },
  setup () {
    const playlists = usePlaylists()
    const store = useSearch()
    const { currentArtist } = storeToRefs(store)
    const { mediaUrl } = useUrls()
    return {
      store,
      currentArtist,
      playlists,
      mediaUrl
    }
  },
  created () {
    this.getArtist()
  },
  mounted () {
    this.store.currentArtist = this.sessionStorage.currentArtist
  },
  beforeUnmount () {
    this.$session.create('currentArtist', this.currentArtist)
  },
  methods: {
    async getArtist () {

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
