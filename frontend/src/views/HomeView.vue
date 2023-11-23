<template>
  <section id="home">
    <div class="container my-4">
      <div class="row">
        <!-- User Playlists -->
        <div class="col-12">
          <base-section :to="{ name: 'home_view' }" :name="$t('Your playlists')">
            <list-playlists :user-playlists="true" />
          </base-section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseSection from '@/layouts/BaseSection.vue'
import ListPlaylists from '../components/playlists/ListPlaylists.vue'

export default {
  name: 'HomeView',
  components: {
    BaseSection,
    ListPlaylists
  }
}
</script>
