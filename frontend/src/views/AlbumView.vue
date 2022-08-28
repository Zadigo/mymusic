<template>
  <base-detail-page-vue class="text-light position-relative">
    <template #default>
      <div class="d-flex justify-content-start">
        <img :src="require('@/assets/cover.jpg')" class="img-fluid rounded shadow" width="250" alt="">

        <div class="ms-3">
          <h1 class="display-4 fw-bold">Album name</h1>
  
          <div class="btn-group shadow-none">
            <button type="button" class="btn btn-light">
              <font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon>
            </button>

            <button type="button" class="btn btn-light">
              <font-awesome-icon icon="fa-solid fa-circle-plus"></font-awesome-icon>
            </button>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="row my-5">
        <div class="col-12">
          <base-songs-list-group-vue />
        </div>
      </div>
    </template>
  </base-detail-page-vue>
</template>

<script>
import BaseDetailPageVue from '@/layouts/BaseDetailPage.vue'
import BaseSongsListGroupVue from '@/layouts/BaseSongsListGroup.vue'

export default {
  name: 'AlbumView',
  components: {
    BaseDetailPageVue,
    BaseSongsListGroupVue
  }
}
</script>
