<template>
  <base-detail-page-vue class="text-light position-relative">
    <template #default>
      <div class="d-flex flex-column w-50 justify-content-start">
        <h1 class="display-2 fw-bold">Jahlys</h1>
        <p>34.4k abonnés</p>

        <div class="actions p-3 mt-1 bg-white text-center rounded shadow-sm">
          <button type="button" class="btn btn-light shadow-none">
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
              <input type="text" class="form-control p-2" placeholder="Search 154 songs...">
            </div>
          </div>
        </div>

        <div class="col-12">
          <base-songs-list-group-vue />
        </div>

        <div class="col-12">
          <div class="card bg-dark text-light my-4">
            <div class="card-body">
              <h3>Discography</h3>

              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Albums</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#">Singles</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#">Mixtapes</a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="#">Riddims</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-detail-page-vue>
</template>

<script>
import BaseDetailPageVue from '@/layouts/BaseDetailPage.vue'
import BaseSongsListGroupVue from '@/layouts/BaseSongsListGroup.vue'

export default {
  name: 'BaseDetailPage',
  components: {
    BaseDetailPageVue,
    BaseSongsListGroupVue
  }
}
</script>


<style scoped>
.actions {
  z-index: 10;
  width: auto;
}
</style>
