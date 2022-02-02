<template>
  <div class="row">
      <div v-for="artist in artists" id="artist" :key="artist.id" :aria-label="artist.name" class="col-3 text-center">
        <b-avatar :src="artist.cover_image|getFullUrl" :alt="artist.name" size="150px" />
        <h2 class="h4 mt-4">{{ artist.name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseListArtists',
  props: {
    artists: {
      type: Array,
      required: true
    }
  }
}
</script>
