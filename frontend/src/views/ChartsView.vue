<template>
  <section id="charts">
    <div class="container my-4">      
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3 mb-3 text-center">
          <base-card-vue>
            <template #body>
              <base-nav-pills-vue :pills="['songs', 'Albums', 'singles']"></base-nav-pills-vue>
            </template>
          </base-card-vue>
        </div>

        <div v-for="i in 40" :key="i" class="col-sm-1 col-md-6 offset-md-3">
          <base-card-vue class="my-1">
            <template #body>
              <div class="d-flex justify-content-left">
                <h3 class="me-3">{{ `#${i}` }}</h3>
                <img :src="require('@/assets/avatar6.png')" width="100" height="100" class="img-fluid" alt="">
                <div class="ms-4">
                  <h4 class="fw-bold">Another</h4>
                </div>
              </div>
            </template>
          </base-card-vue>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseCardVue from '@/layouts/bootstrap/cards/BaseCard.vue'
import BaseNavPillsVue from '@/layouts/BaseNavPills.vue';

export default {
  name: 'ChartsView',
  components: {
    BaseCardVue,
    BaseNavPillsVue
  }
}
</script>
