<template>
  <div class="row">
    <div class="col-12">
      <h2>{{ $t('Best playlists') }}</h2>
      
      <transition-group tag="div" class="row">
        <div v-for="playlist in 8" :key="playlist" class="col-3">
          <router-link :to="{ name: 'playlist', params: { id: playlist } }">
            <b-card :id="playlist.name" :img-src="'http://via.placeholder.com/400'" overlay></b-card>
          </router-link>
        </div>
      </transition-group>
    </div>
    
    <div class="col-12">
      <!-- Les nouveautés -->
      <h2>{{ $t('Novelties') }}</h2>

      <transition-group tag="div" class="row">
        <div v-for="playlist in 8" :key="playlist" class="col-3">
          <router-link :to="{ name: 'playlist', params: { id: playlist } }">
            <b-card :id="playlist.name" :img-src="'http://via.placeholder.com/400'" overlay></b-card>
          </router-link>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseListPlaylists',

  props: {
    playlists: {
      type: Array,
      required: true 
    },
    novelties: {
      type: Array,
      required: true
    }
  }
}
</script>
