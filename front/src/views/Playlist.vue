<template>
  <section id="playlist">

    <!-- Header -->
    <div id="playlist-header" class="row p-5 mb-5 text-white">
      <div class="col-5">
        <b-img width="300" height="300" :src="currentPlaylist.playlist_cover" :alt="currentPlaylist.name" rounded fluid />
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

        <!-- Advanced search -->
        <b-link @click="showAdvanced=!showAdvanced">Advanced searched</b-link>
        <div v-if="showAdvanced" id="advanced-search">
          <v-combobox :items="['Dancehall', 'Rap']" chips clearable small-chips multiple></v-combobox>
        </div>
      </div>
    </div>

    <div id="songs" class="row">
      <div class="col-12">
        <!-- <b-table ref="selectableTable" responsive="sm" :items="searchedSongs" :fields="['name', 'albumId', 'added_on']" :select-mode="selectMode" selectable @row-selected="onSongSelection">
          <template #cell(selected)="{ rowSelected }">
            <div v-if="rowSelected">G</div>
          </template>
        </b-table> -->
        <b-list-group class="mt-4">
          <b-list-group-item v-for="(song, index) in searchedSongs" :key="index" :aria-label="song.name" button @click="() => {}">
            <div class="infos">
              <b-img :alt="null" :src="getAlbumImage(song.album_id)" rounded fluid />
              {{ song.name }}
            </div>

            {{ song.album_id }}

            <div class="actions">
              <font-awesome-icon icon="heart"></font-awesome-icon>
              <time datetime="M2S20">2:20</time>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>

    <!-- Songs -->
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
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
    // var currentPlaylist = this.$store.getters['userPlaylistModule/getPlaylist'](this.$route.params.id)
    // this.currentPlaylist = currentPlaylist
    // this.$store.commit('userPlaylistModule/setCurrentPlaylist', currentPlaylist)
    this.$store.commit('userPlaylistModule/setCurrentPlaylist', this.$route.params.id)
  },
  
  methods: {
    onSongSelection (items) {
      // Set the player to the current
      // selected song. Also let the player
      // know that it needs to continue with
      // the remaining songs in the playlist
      this.$store.dispatch('playerModule/setCurrentSong', { song: items, playlist: this.currentPlaylist.songs, playlistId: this.currentPlaylist.id })
    },

    sortSongsBy (sortMethod) {
      // Sort the current playlist by the
      // current item that is passed
      this.$store.commit('userPlaylistModule/setSortBy', sortMethod)
    },
    getAlbumImage (id) {
      var album = this.$store.getters['getAlbum'](id)
      return album.cover_image
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
