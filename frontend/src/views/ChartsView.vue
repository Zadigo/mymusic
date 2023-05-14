<template>
  <section id="charts">
    <div class="container my-4">      
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3 mb-3 text-center">
          <base-card-vue>
            <template #body>
              <base-nav-pills-vue :pills="['Songs', 'Albums', 'Singles']" @pill-click="handlePill"></base-nav-pills-vue>
            </template>
          </base-card-vue>
        </div>

        <!-- Albums -->
        <article v-for="(item, i) in chartItems" :key="item.id" class="col-sm-1 col-md-6 offset-md-3">
          <base-card-vue class="my-1">
            <template #body>
              <div class="d-flex justify-content-left">
                <h3 class="me-3">{{ `#${i + 1}` }}</h3>
                <img :src="mediaUrl(item.album.cover_image)" :alt="item.name" width="100" height="100" class="img-fluid">
                <div class="ms-4">
                  <h4 class="fw-bold">{{ item.name }}</h4>
                  <p>{{ $tc('k listeners', { count: item.listeners }) }} / 15 auditeur/mois</p>
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary btn-rounded shadow-none">
                      <!-- v-if="isPlaying" -->
                      <font-awesome-icon icon="fa-solid fa-heart" />
                      <!-- <font-awesome-icon v-else icon="fa-solid fa-play"></font-awesome-icon> -->
                    </button>
                    
                    <button type="button" class="btn btn-primary btn-rounded shadow-none">
                      <!-- v-if="isPlaying" -->
                      <font-awesome-icon icon="fa-solid fa-play" />
                      <!-- <font-awesome-icon v-else icon="fa-solid fa-play"></font-awesome-icon> -->
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </base-card-vue>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import { useUrls } from '@/composables/utils'

import BaseCardVue from '@/layouts/bootstrap/cards/BaseCard.vue'
import BaseNavPillsVue from '@/layouts/BaseNavPills.vue'

export default {
  name: 'ChartsView',
  components: {
    BaseCardVue,
    BaseNavPillsVue
  },
  setup () {
    const { mediaUrl } = useUrls()
    return {
      mediaUrl
    }
  },
  data () {
    return {
      currentPill: 'Songs',
      chartItems: []
    }
  },
  methods: {
    async handlePill (value) {
      try {
        this.currentPill = value
        const response = await this.$http.post('artists/charts', { 'chart_type': value })
        this.chartItems = response.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
