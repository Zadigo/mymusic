<doc>
  A section for listing multiple songs from different albums
</doc>

<template>
  <div class="list-group">
    <div v-for="(album, x) in filterAlbumsBy" :key="album.id" :class="{ 'mt-4': x >= 1 }" class="list-group-items">
      <h3 class="list-group-item-heading">{{ album.name }}</h3>

      <!-- Songs -->
      <a v-for="song in searchedSongs(album)" :key="song.id" href class="list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center" @click.prevent>
        <div class="d-flex flex-column">
          <span>
            {{ song.name }}
            <font-awesome-icon icon="fa-solid fa-e" class="ms-3" />
          </span>
  
          <router-link :to="{ name: 'artist_view', params: { id: 'nnoin' } }" class="text-muted text-decoration">
            {{ album.artist.name }}
          </router-link>
        </div>
  
        <div class="btn-group">
          <button v-if="isPlaying && store.isCurrentSong(song)" type="button" class="btn btn-primary btn-sm" @click="store.pause">
            <font-awesome-icon icon="fa-solid fa-pause" />
          </button>
  
          <button v-else type="button" class="btn btn-primary btn-sm" @click="store.play(refix(album, song))">
            <font-awesome-icon icon="fa-solid fa-play" />
          </button>
  
          <button type="button" class="btn btn-primary btn-sm">
            <font-awesome-icon icon="fa-solid fa-heart" />
          </button>
  
          <button type="button" class="btn btn-primary btn-sm">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
          </button>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { usePlayer } from '@/store/player'
import { storeToRefs } from 'pinia'
// import { useSearch } from '@/composables/utils'
// import { getCurrentInstance } from 'vue'

export default {
  name: 'BaseAlbumsSongsListGroup',
  props: {
    albums: {
      type: Array,
      default: () => []
    },
    search: {
      type: String,
      default: null
    },
    filterBy: {
      type: String,
      default: 'All'
    }
  },
  setup () {
    const store = usePlayer()
    const { isPlaying } = storeToRefs(store)
    // const instance = getCurrentInstance()
    // const { search, searchedValues } = useSearch('name', instance.props.albums, instance.props.search)
    return {
      store,
      isPlaying
      // searchx: search,
      // searchedValues
    }
  },
  computed: {
    filterAlbumsBy () {
      let values = []
      switch (this.filterBy) {
        case 'All':
          values = this.albums
          break
          
        case 'Singles':
          values = _.filter(this.albums, (album) => {
            return album.is_single === true
          })
          break

        case 'Albums':
          values = _.filter(this.albums, (album) => {
            return album.is_single === false
          })
          break

        case 'Mixtapes':
          values = []
          break
        
        case 'Riddims':
          values = []
          break
          
        default:
          values = this.albums
          break
      }
      return values
    }
  }, 
  methods: {
    searchedSongs (album) {
      // Search songs within all albums
      if (!this.search) {
        return album.song_set
      } else {
        return _.filter(album.song_set, (song) => {
          return song.name === this.search || song.name.includes(this.search) || song.name.toLowerCase() === this.search || song.name.toLowerCase().includes(this.search)
        })
      }
    },
    refix (album, song) {
      const value = { ...album }
      delete value.song_set
      delete value.featuring_artists
      song.artist = album.artist
      song.album = value
      return song
    }
  }
}
</script>

<style scoped>
button {
  width: 40px;
}
</style>
