<template>
  <section id="playlist">

    <!-- Header -->
    <div class="row p-5 mb-5">
      <div class="col-3">
        <b-img :src="currentPlaylist.playlistCover" :alt="currentPlaylist.name" rounded="top" fluid />
      </div>

      <div class="col-9">
        <h2>{{ currentPlaylist.name }}</h2>
        <p>by {{ currentPlaylist.author }}</p>
      </div>

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

    <!-- Songs -->
    <b-table ref="selectableTable" responsive="sm" :items="searchedSongs" :fields="['name', 'albumId', 'added_on']" :select-mode="selectMode" selectable @row-selected="onSongSelection">
      <template #cell(selected)="{ rowSelected }">
        <div v-if="rowSelected">G</div>
      </template>
    </b-table>
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
    }
  }
}
</script>

<style scoped>
  #header {
    background-color: blue;
    height: 300px;
  }
</style>
