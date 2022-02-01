<template>
  <div class="row">
    <div v-for="i in 4" id="album" :key="i" class="col-3 text-left" aria-label="">
      <b-img src="http://via.placeholder.com/400" width="150px" />
      <h2 class="h4 mt-4 mb-2" aria-label="">Album name</h2>
      <p class="text-muted" aria-label="">Artists names</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseListAlbums'
}
</script>
