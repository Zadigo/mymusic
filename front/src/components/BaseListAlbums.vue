<template>
  <div class="row">
    <div v-for="album in albums" id="album" :key="album.id" class="col-3 text-left" aria-label="">
      <b-img :src="album.cover_image_thumbnail|getFullUrl" width="150px" />
      <h2 class="h4 mt-4 mb-2" aria-label="">{{ album.name }}</h2>
      <p class="text-muted" aria-label="">{{ album.artist.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseListAlbums',
  props: {
    albums: {
      type: Array,
      required: true
    }
  }
}
</script>
