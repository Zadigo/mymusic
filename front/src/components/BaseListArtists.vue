<template>
  <div class="row">
      <div v-for="i in 4" id="artist" :key="i" class="col-3 text-center">
        <b-avatar src="http://via.placeholder.com/400" size="150px" />
        <h2 class="h4 mt-4">Jahlys</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseListArtists'
}
</script>
