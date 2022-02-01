<template>
  <div class="row">
    <div class="col-12">
      <h2>Meilleures playlists</h2>
      
      <div class="row">
        <div v-for="playlist in 8" :key="playlist" class="col-3">
          <b-card :id="playlist.name" :img-src="'http://via.placeholder.com/400'" img-top>

          </b-card>
        </div>
      </div>
    </div>
    
    <div class="col-12">
      <h2>Les nouveautés</h2>

      <div class="row">
        <div v-for="playlist in 8" :key="playlist" class="col-3">
          <b-card :id="playlist.name" :img-src="'http://via.placeholder.com/400'" img-top>

          </b-card>
        </div>
      </div>
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
