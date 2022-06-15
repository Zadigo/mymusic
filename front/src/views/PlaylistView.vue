<template>
  <section id="playlist" :style="`background-color: #${currentPlaylist.background_color};`" class="p-5">
    <!-- Header -->
    <header>
      <div id="playlist-header" class="row p-5 mb-5 text-white">
        <div class="col-5">
          <b-img class="shadow" width="300" height="300" :src="currentPlaylist.cover_image|getFullUrl" :alt="currentPlaylist.name" rounded fluid />
        </div>

        <div class="col-auto">
          <h1>{{ currentPlaylist.name }}</h1>
          <p class="font-weight-bold">{{ $t('by', { username: currentPlaylist.author.username }) }}</p>
          <p class="text-muted">{{ $tc('songs', currentPlaylist.songs.length) }} / {{ $tc('followers', currentPlaylist.number_of_followers) }}</p>

          <v-btn @click="playAllSongs(currentPlaylist)">
            <font-awesome-icon class="mr-2" icon="play" />
            {{ $t('Play all') }}
          </v-btn>
        </div>
      </div>
    </header>

    <div class="row px-5">
      <!-- Search -->
      <div class="col-12">
        <div class="row">
          <div class="col-9">
            <v-text-field v-model="searchedSong" type="text" :label="$t('Search playlist by song name, genre, artist name...')" elevation="0" solo hide-details></v-text-field>
            <!-- <b-form-input v-model="searchedSong" type="search" placeholder="Search"></b-form-input> -->
          </div>

          <div class="col-auto">
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mr-2" color="primary" dark v-bind="attrs" v-on="on">
                  {{ $t('Sort') }}
                </v-btn>
              </template>

              <v-list>
                <v-list-item-group>
                  <v-list-item v-for="(sortMethod, index) in sortingList" :key="index" @click="sortSongsBy(sortMethod.method)">
                    {{ sortMethod.name }}
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>

            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  <font-awesome-icon icon="ellipsis-h" />
                </v-btn>
              </template>

              <v-list>
                <v-list-item-group>
                  <v-list-item @click="deletePlaylist">
                    {{ $t('Delete') }}
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </div>

          <div class="col-12">
            <!-- Advanced search -->
            <v-btn text @click="showAdvanced=!showAdvanced">
              <font-awesome-icon icon="arrow-down" class="mr-2" />
              {{ $t('Advanced search') }}
            </v-btn>
          </div>

          <div v-if="showAdvanced" class="row">
            <div class="col-8">
              <v-combobox :items="availableGenres.map((item) => { return item.name})" label="Search by genre" chips clearable small-chips multiple solo></v-combobox>
            </div>
          </div>
        </div>

      </div>

      <!-- Songs -->
      <div class="col-12">
        <base-list-playlist-songs :songs="searchedSongs" @play-song="playSong" @pause-song="pauseSong" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import BaseListPlaylistSongs from '../components/BaseListPlaylistSongs.vue'

export default {
  name: 'Playlist',
  components: {BaseListPlaylistSongs  },
  data: () => ({
    showAdvanced: false,
    selectMode: 'single',
    selected: [],
    sortingList: [
      // 'Album', 'Artist', 'Added', 'Duration', 'Genre', 'Name'
      { name: 'Song name', method: 'Song name' },
      { name: 'Album', method: 'Album name' },
      { name: 'Genre', method: 'Genre' },
      { name: 'Artist', method: 'Artist name'},
      { name: 'Added', method: 'Added' },
      { name: 'Duration', method: 'Duration' }
    ]
  }),
  computed: {
    ...mapGetters('userPlaylistModule', {
      searchedSongs: 'getSearchedSongs'
    }),
    ...mapState('userPlaylistModule', ['currentPlaylist']),
    ...mapState('playerModule', ['isPlaying']),
    ...mapState(['availableGenres']),

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
    this.$store.commit('userPlaylistModule/setCurrentViewedPlaylist', this.$route.params.id)
    // this.playlistDetails()
  },
  
  methods: {
    // async playlistDetails() {
    //   try {
    //     var response = await this.$axios.get(`/playlist/${this.currentPlaylist.id}`)
    //     this.$store.commit('userPlaylistModule/playlistDetails', response.data)
    //   } catch(error) {
    //     console.log(error)
    //   }
    // },
    async sortSongsBy(sortMethod) {
      try {
        var response = await this.$axios.post(`/playlists/${this.$route.params.id}/sort`, { user_sort: sortMethod})
        
        this.$store.commit('userPlaylistModule/updatePlaylistSorting', { id: response.data['id'], songs: response.data['songs']})
        this.$store.commit('userPlaylistModule/setSortBy', sortMethod)
      } catch(error) {
        console.log(error)
      }
    },

    async deletePlaylist() {
      try {
        var response = this.$axios.post(`/playlists/${this.$route.params.id}/delete`)

        this.$store.commit('userPlaylistModule/deletePlaylist', response.data)
        this.$router.push({ name: 'playlists' })
      } catch(error) {
        console.log(error)
      }
    },
    
    playSong(song) {
      // Set the player to the current
      // selected song. Also let the player
      // know that it needs to continue with
      // the remaining songs in the playlist
      this.$store.dispatch('playerModule/playSelected', { songId: song.id, playlistId: this.currentPlaylist.id, playlist: this.currentPlaylist.songs })
    },

    pauseSong(song) {
      // Pause the current select song
      this.$store.dispatch('playerModule/pauseSelected', { songId: song.id })
    },

    getAlbumImage (id) {
      var album = this.$store.getters['getAlbum'](id)
      return album.cover_image
    },

    playAllSongs (playlist) {
      this.$store.dispatch('playerModule/startPlaylist', playlist.songs)
    }
  }
}
</script>

<style scoped>
  #playlist-header {
    height: auto;
    /* height: 500px; */
    /* background-image: url('https://picsum.photos/1200/400'); */
    /* background-color: #3498db; */
  }
</style>
