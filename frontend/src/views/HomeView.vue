<template>
  <section id="home">
    <div class="container my-4">
      <div class="row">
        <div class="col-12">
          <base-section-vue :to="{ name: 'home_view' }" name="Your playlists"></base-section-vue>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseSectionVue from '@/layouts/BaseSection.vue'

export default {
  name: 'HomeView',
  components: {
    BaseSectionVue
  }
}
</script>
