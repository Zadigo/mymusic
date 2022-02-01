<template>
  <section id="search">
    <div class="row">

      <!-- Search -->
      <div class="col-12">
        <b-form-input v-model="searchedItem" placeholder="Search"></b-form-input>

        <b-link>Advanced search</b-link>

        <v-combobox :items="['Guadeloupe', 'Martinique', 'Jamaïque', 'Congo']" multiple chips clearable hide-selected></v-combobox>
        <v-range-slider :value="[2009, 2020]" hint="Choose year" min="2000" max="2022" step="1">
          <template v-slot:thumb-label="props">
            <v-icon dark>
              {{ props.value }}
            </v-icon>
          </template>
        </v-range-slider>
      </div>

      <transition name="scale">
        <!-- Genres -->
        <div v-if="searchedItem == null | searchedItem == ''" class="col-12">
          <div class="row">
            <div class="col-12"></div>

            <div class="col-12">
              <h2 class="text-white mb-5">Explorer tout les genres</h2>

              <div class="row">
                <div v-for="(genre, index) in availableGenres" :key="index" class="col-4">
                  <router-link :to="{ name: 'genre', params: { genre: genre } }">
                    <b-card :title="genre" :img-src="'http://via.placeholder.com/500'" :img-alt="'a'" text-variant="white" overlay>
                      <b-card-text>
                        Some quick example text to build on the card and make up the bulk of the card's content.
                      </b-card-text>
                    </b-card> 
                  </router-link>
                </div>
              </div>
            </div>
          </div>        
        </div>

        <!-- Songs -->
        <div v-else class="col-12">
          <b-card id="songs">
            <div class="row">
              <div class="col-12">
                <div class="d-flex justify-content-between">
                  <h2 class="h4 mb-3">Meilleurs résultats</h2>
                  <router-link :to="{ name: 'search_more', params: { search: 'songs' } }" class="text-uppercase font-weight-bold text-muted">
                    Voir tout
                  </router-link>
                </div>
                
                <base-list-songs :songs="[]" />
              </div>
            </div>
          </b-card>

          <!-- Artists -->
          <b-card id="artists" class="mt-4">
            <div class="row">
              <div class="col-12 text-right">
                <router-link :to="{ name: 'search_more', params: { search: 'artists' } }" class="text-uppercase font-weight-bold text-muted">
                  Voir tout
                </router-link>
              </div>

              <base-list-artists :artists="[]" />
            </div>
          </b-card>

          <!-- Albums -->
          <b-card id="albums" class="mt-4">
            <div class="row">
              <div class="col-12 text-right">
                <router-link :to="{ name: 'search_more', params: { search: 'albums' } }" class="text-uppercase font-weight-bold text-muted">
                  Voir tout
                </router-link>
              </div>

              <base-list-albums :albums="[]" />
            </div>
          </b-card>

        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import BaseListSongs from '../components/BaseListSongs.vue'
import BaseListArtists from '../components/BaseListArtists.vue'
import BaseListAlbums from '../components/BaseListAlbums.vue'

export default {
  name: 'Search',

  data () {
    return {
      availableGenres: []
    }
  },
  components: { BaseListSongs, BaseListArtists, BaseListAlbums },
  
  computed: {
    ...mapGetters(['searchAlbums']),
    
    searchedItem: {
      // TODO: This should not search a playlist but instead
      // search all the database for specific songs. This should
      // receive { songs: [], albums: [], artists: []} response
      get () { return this.$store.state.userPlaylistModule.search },
      set (value) { this.$store.commit('userPlaylistModule/setSearch', value) }
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.availableGenres = ['dancehall', 'zouk', 'gwoka', 'biguine']
    })
  }
}
</script>
