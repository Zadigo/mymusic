<template>
  <section id="playlist">

    <!-- Header -->
    <div id="playlist-header" class="row p-5 mb-5 text-white">
      <div class="col-5">
        <b-img width="300" height="300" :src="currentPlaylist.cover_image|getFullUrl" :alt="currentPlaylist.name" rounded fluid />
      </div>

      <div class="col-auto">
        <h1>{{ currentPlaylist.name }}</h1>
        <p>by {{ currentPlaylist.author }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <b-form-input v-model="searchedSong" type="search" placeholder="Search"></b-form-input>

        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Sort
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(sortMethod, index) in sortingList" :key="index" @click="sortSongsBy(sortMethod)">
                {{ sortMethod }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <font-awesome-icon icon="horizontal-dots" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <v-list-item @click="deletePlaylist">
                Delete
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <!-- Advanced search -->
        <b-link @click="showAdvanced=!showAdvanced">Advanced searched</b-link>
        <div v-if="showAdvanced" id="advanced-search">
          <v-combobox :items="['Dancehall', 'Rap']" chips clearable small-chips multiple></v-combobox>
        </div>
      </div>
    </div>

    <div id="songs" class="row">
      <div class="col-12">
        <base-list-playlist-songs :songs="searchedSongs" />
      </div>
    </div>

  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BaseListPlaylistSongs from '../components/BaseListPlaylistSongs.vue'

export default {
  components: {BaseListPlaylistSongs  },
  name: 'Playlist',

  data: () => ({
    showAdvanced: false,
    selectMode: 'single',
    selected: [],
    sortingList: ['Album', 'Artist', 'Added', 'Duration', 'Genre', 'Name']
  }),

  computed: {
    ...mapGetters('userPlaylistModule', {
      sortedSongs: 'getSortedSongs',
      searchedSongs: 'getSearchedSongs'
    }),
    ...mapState('userPlaylistModule', ['currentPlaylist']),
    ...mapState('playerModule', ['isPlaying']),

    searchedSong: {
      get () { 
        return this.$store.state.userPlaylistModule.search
      },
      set (value) {
        this.$store.commit('userPlaylistModule/setSearch', value)
      }
    }
  },

  beforeMount () {
    this.$store.commit('userPlaylistModule/setCurrentPlaylist', this.$route.params.id)
  },
  
  methods: {
    playSong (songId) {
      // Set the player to the current
      // selected song. Also let the player
      // know that it needs to continue with
      // the remaining songs in the playlist
      // console.log(songId)
      this.$store.dispatch('playerModule/playSelected', { songId: songId, playlistId: this.currentPlaylist.id, playlist: this.currentPlaylist.songs })
    },

    pauseSong (songId) {
      // Pause the current select song
      this.$store.dispatch('playerModule/pauseSelected', { songId: songId })
    },

    sortSongsBy (sortMethod) {
      // Sort the current playlist by the
      // current item that is passed
      this.$store.commit('userPlaylistModule/setSortBy', sortMethod)
    },

    getAlbumImage (id) {
      var album = this.$store.getters['getAlbum'](id)
      return album.cover_image
    },

    deletePlaylist () {
      this.$api.playlists.delete(this.$route.params.id)
      .then((response) => {
        this.$store.commit('userPlaylistModule/deletePlaylist', response.data)
        this.$router.push({ name: 'playlists' })
      })
      .catch((error) => {
        error
      })
    }
  }
}
</script>

<style scoped>
  #playlist-header {
    height: 500px;
    /* background-image: url('https://picsum.photos/1200/400'); */
    background-color: #3498db;
  }
</style>
