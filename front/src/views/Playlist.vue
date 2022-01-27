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
        <b-input v-model="search" type="search"></b-input>

        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Sort
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <v-list-item v-for="item in sortingList" :key="item" @click="sortSongsBy(item)">
                {{ item }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </div>

    <b-table ref="selectableTable" responsive="sm" :items="sortedSongs" :fields="['name', 'albumId', 'added_on']" :select-mode="selectMode" selectable @row-selected="onSongSelection">
      <template #cell(selected)="{ rowSelected }">
        <div v-if="rowSelected">G</div>
      </template>
    </b-table>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Playlist',
  data: () => ({
    currentPlaylist: {},
    selectMode: 'single',
    selected: [],
    search: null,
    sortingList: ['Album', 'Artist', 'Added', 'Duration', 'Genre', 'Name']
  }),

  computed: {
    ...mapGetters('userPlaylistModule', {
      sortedSongs: 'getSortedSongs',
      seachedSongs: 'getSearchedSongs'
    }),

    searchedSongs: {
      get: (vm) => { return vm.$store.getters['userPlaylistModule/getSearchedSongs']("c'est") },
      set: () => {  }
    }
  },

beforeMount() {
    var currentPlaylist = this.$store.getters['userPlaylistModule/getPlaylist'](this.$route.params.id)
    this.currentPlaylist = currentPlaylist
    this.$store.commit('userPlaylistModule/setCurrentPlaylist', currentPlaylist)
  },

  
  methods: {
    onSongSelection (items) {
      // Set the player to the current
      // selected song. Also let the player
      // know that it needs to continue with
      // the remaining songs in the playlist
      this.$store.dispatch('playerModule/setCurrentSong', { song: items, playlist: this.currentPlaylist.songs, playlistId: this.currentPlaylist.id })
    },

    sortSongsBy (item) {
      // Sort the current playlist by the
      // current item that is passed
      // this.$store.getters['userPlaylistModule/sortedSongsInPlaylist'](item)
      this.$store.commit('userPlaylistModule/setSortBy', item)
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
