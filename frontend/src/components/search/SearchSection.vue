<template>
  <div class="card bg-dark">    
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h2 class="h4 mb-3">{{ sectionTitle }}</h2>
        <a href class="text-uppercase font-weight-bold text-muted" @click.prevent="$emit('show-all', 'a')">
          {{ $t('See all') }}
        </a>
      </div>

      <component :is="componentName" />
    </div>
  </div> 
</template>

<script>
import ListAlbumsVue from './ListAlbums.vue'
import ListArtistsVue from './ListArtists.vue'
import ListSongsVue from './ListSongs.vue'

export default {
  name: 'SearchSection',
  components: {
    ListAlbumsVue,
    ListSongsVue,
    ListArtistsVue
  },
  props: {
    sectionTitle: {
      type: String,
      required: true
    },
    componentName: {
      type: String,
      required: true
    }
  },
  emits: {
    'show-all': () => true
  },
  data () {
    return {
      showAll: false
    }
  },
  computed: {
    linkParams () {
      let search = 'songs'

      switch (this.componentName) {
        case 'list-artists-vue':
          search = 'artists'
          break
        
        case 'list-albums-vue':
          search = 'albums'
          break
      
        default:
          break
      }
      return search
      // return { name: 'search_more_view', params: { search: search } }
    }
  }
}
</script>
