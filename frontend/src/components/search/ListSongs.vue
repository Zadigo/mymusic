<template>
  <div class="row">
    <div v-if="songs.length > 0" class="col-12">
      <base-songs-list-group :songs="songs" />
    </div>

    <empty-iteration-vue v-else content="No songs" />
  </div>
</template>

<script>
import BaseSongsListGroup from '@/layouts/BaseSongsListGroup.vue'
import EmptyIterationVue from '../EmptyIteration.vue';

export default {
  name: 'ListSongs',
  components: {
    BaseSongsListGroup,
    EmptyIterationVue
  },
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  }
}
</script>
