<template>
  <section id="home">
    <div class="container my-4">
      <div class="row">
        <!-- User Playlists -->
        <div class="col-12">
          <base-section-vue :to="{ name: 'home_view' }" :name="$t('Your playlists')">
            <list-playlists-vue />
          </base-section-vue>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseSectionVue from '@/layouts/BaseSection.vue'
import ListPlaylistsVue from '../components/playlists/ListPlaylists.vue'

export default {
  name: 'HomeView',
  components: {
    BaseSectionVue,
    ListPlaylistsVue
  }
}
</script>
