<template>
  <b-list-group v-if="this.hasSongs">
    <b-list-group-item v-for="song in songs" :key="song.id" class="d-flex justify-content-between" @play-song="$emit('play-song')" @pause-song="$emit('pause-song')">
      <div id="infos" class="row">
        <!-- Play/Pause -->
        <div class="col-auto">
          <v-btn v-if="currentSong.id == song.id && isPlaying" class="mr-2" icon @click="$emit('pause-song', song)">
            <font-awesome-icon icon="pause" />
          </v-btn>

          <v-btn v-else class="mr-2" icon @click="$emit('play-song', song)">
            <font-awesome-icon icon="play" />
          </v-btn>

          <b-img :src="song.album.cover_image|getFullUrl" width="40px" height="40px" rounded fluid />
        </div>

        <div class="col-auto">
          <div class="d-flex flex-column">
            <span>{{ song.name }}</span>
            <span class="text-muted">{{ song.album.artist.name }}</span>
          </div>
        </div>
      </div>

      <div id="actions">
        <v-btn icon @click="likeSong(song)">
          <font-awesome-icon class="mx-4" icon="heart" />
        </v-btn>

        <time :datetime="song.duration|formatDuration">{{ song.duration|simpleDuration }}</time>

        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon v-on="on">
              <font-awesome-icon icon="ellipsis-v" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <v-list-item>
                {{ $t("Aller sur la page de l'artiste") }}
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                {{ $t("See album") }}
              </v-list-item>
              
              <v-divider></v-divider>
              
              <v-list-item @click="removeFromPlaylist(song)">
                {{ $t('Remove from playlist') }}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </b-list-group-item>
  </b-list-group>

  <div v-else>
    <h1>{{ $t('Search songs to add to your playlist') }}</h1>
    <v-text-field v-model="searchedItem.name" type="text" elevation="0" solo></v-text-field>

    <div class="row">
      <div class="col-12">
        <template v-for="item in searchResults">
          <div v-for="song in item.song_set" :key="song.id" class="col-12 d-flex justify-content-around border p-3">
            {{ song.name }}

            <v-btn @click="addToPlaylist(currentPlaylist)">{{ $t('Add') }}</v-btn>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// Component used to list songs for a playlist.
// The reason we don't use the BaseListSong is
// because the iteration reasons by albums 
//  whereas this reasons by songs

import ListSongsMixin from './ListSongsMixin'

export default {
  name: 'BaseListPlaylistSongs',
  
  mixins: [ListSongsMixin],

  data: () => ({
    searchResults: [],
    searchedItem: {
      name: null
    }
  }),
  computed: {
    ...mapState('userPlaylistModule', ['currentPlaylist'])
  },
  watch: {
    'searchedItem.name'(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.searchAlbums()
      }
    }
  },
  methods: {
    async removeFromPlaylist(song) {
      try {
        var response = await this.$axios.post(`/playlists/${this.$route.params.id}/remove`, { song_id: song.id})
        this.$store.commit('userPlaylistModule/updateSinglePlaylist', response.data)
      } catch(error) {
        console.log(error)
      }
    },

    async addToPlaylist(song) {
      try {
        var response = await this.$axios.post(`/playlists/${this.currentPlaylist.id}/add`, { song_id: song.id})
        this.$store.commit('userPlaylistModule/updateSinglePlaylist', response.data)
      } catch(error) {
        console.log(error)
      }
    },

    async searchAlbums() {
      try {
        var response = await this.$axios.post('/artists/search', this.searchedItem)
        this.searchResults = response.data
      } catch(error) {
        console.log(error)
      }
    },

    async likeSong(song) {
      // Do something
      song
    }
  }
}
</script>
