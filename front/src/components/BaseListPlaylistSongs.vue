<template>
  <b-list-group v-if="this.hasSongs">
    <b-list-group-item v-for="song in songs" :key="song.id" class="d-flex justify-content-between">
      <div id="infos" class="row">
        <div class="col-auto">
          <v-btn class="mr-2" icon>
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
        <font-awesome-icon class="mx-4" icon="heart" />
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
                Aller sur la page de l'artiste
              </v-list-item>
              
              <v-list-item @click="removeFromPlaylist(song.id)">
                Remove from playlist
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </b-list-group-item>
  </b-list-group>

  <div v-else>
    <h1>There's no songs found</h1>
  </div>
</template>

<script>
// Component used to list songs for a playlist.
// The reason we don't use the BaseListSong is
// because the iteration reasons by albums 
//  whereas this reasons by songs

import listSongMixin from './list_songs_mixin'

export default {
  name: 'BaseListPlaylistSongs',
  
  mixins: [listSongMixin],

  methods: {
    removeFromPlaylist (songId) {
      this.$api.playlists.remove(this.$route.params.id, songId)
      .then((response) => {
        this.$store.commit('userPlaylistModule/updateSinglePlaylist', response.data)
      })
      .catch((error) => {
        error
      })
    }
  }
}
</script>
