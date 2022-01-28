<template>
  <section id="search">
    <div class="row">
      <div class="col-12">
        <b-form-input v-model="search" placeholder="Search"></b-form-input>

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
        <div v-if="search == null | search == ''" class="col-12">
          <div class="row">
            <div class="col-12"></div>

            <div class="col-12">
              <h2 class="text-white mb-5">Explorer tout les genres</h2>

              <div class="row">
                <div v-for="i in 20" :key="i" class="col-4">
                  <router-link :to="{ name: 'genre', params: { genre: 'rap' } }">
                    <b-card :img-src="'http://via.placeholder.com/500'" :img-alt="'a'" text-variant="white" title="Rap" overlay>
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

        <div v-else class="col-12">
          <!-- Songs -->
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

                <!-- <b-list-group>
                  <b-list-group-item v-for="i in 5" :key="i" class="d-flex justify-content-between" @click="() => {}">
                    <div id="infos" class="row">
                      <div class="col-auto">
                        <b-img src="http://via.placeholder.com/40" rounded fluid />
                      </div>

                      <div class="col-auto">
                        <div class="d-flex flex-column">
                          <span>Song name</span>
                          <span class="text-muted">Artist name</span>
                        </div>
                      </div>
                    </div>

                    <div id="actions">
                      <font-awesome-icon class="mx-4" icon="heart" />
                      <time datetime="3M20S">3:20</time>

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
                </b-list-group> -->
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
              
              <div v-for="i in 4" id="artist" :key="i" class="col-3 text-center">
                <b-avatar src="http://via.placeholder.com/400" size="150px" />
                <h2 class="h4 mt-4">Jaylis</h2>
              </div>
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
              
              <div v-for="i in 4" id="album" :key="i" class="col-3 text-left" aria-label="">
                <b-img src="http://via.placeholder.com/400" width="150px" />
                <h2 class="h4 mt-4 mb-2" aria-label="">Album name</h2>
                <p class="text-muted" aria-label="">Artists names</p>
              </div>
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

export default {
  name: 'Search',

  components: { BaseListSongs },
  
  data () {
    return {
      search: null
    }
  },
  
  computed: {
    ...mapGetters(['searchAlbums'])
  }
}
</script>
