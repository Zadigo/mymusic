<template>
  <b-list-group v-if="this.hasSongs">
    <b-list-group-item v-for="song in songs" :key="song.id" class="d-flex justify-content-between">
      <div id="infos" class="row">
        <div class="col-auto">
          <v-btn class="mr-2" icon>
            <font-awesome-icon icon="play" />
          </v-btn>

          <b-img :src="song.cover_image_thumbnail" rounded fluid />
        </div>

        <div class="col-auto">
          <div class="d-flex flex-column">
            <span>{{ song.name }}</span>
            <span class="text-muted">{{ song.artist.name }}</span>
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
// Component used to list songs using
// a list group

import { mapState } from 'vuex'

export default {
  name: 'BaseListSongs',

  props: {
    songs: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapState('playerModule', ['isPlaying']),

    hasSongs () {
      return this.songs.length > 0
    }
  }
}
</script>
