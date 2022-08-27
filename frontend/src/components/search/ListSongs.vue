<template>
  <div class="row">
    <div class="col-12">
      <base-songs-list-group />
    </div>
  </div>
</template>

<script>
import BaseSongsListGroup from '@/layouts/BaseSongsListGroup.vue'

export default {
  name: 'ListSongs',
  components: { BaseSongsListGroup }
}
</script>
