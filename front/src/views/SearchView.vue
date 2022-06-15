<template>
  <section id="search" class="p-5">
    <div class="row">
      <!-- Search -->
      <div class="col-12">
        <v-text-field v-model="searchedItem.name" :placeholder="$t('Search')" type=" text" elevaton="0" hide-details solo></v-text-field>
        <!-- <b-form-input v-model="searchedItem.name" placeholder="Search"></b-form-input> -->
        <!-- <v-btn @click="doSearch">
          Search
        </v-btn> -->

        <b-link class="my-4" @click="showAdvancedSearch=!showAdvancedSearch">
          {{ $t('Advanced search') }}
        </b-link>

        <div v-if="showAdvancedSearch" id="advanced">
          <v-combobox v-model="searchedItem.area" :items="['Guadeloupe', 'Martinique', 'Jamaïque', 'Congo']" outlined multiple chips clearable hide-selected hide-details></v-combobox>
          
          <v-range-slider :value="[2009, 2020]" hint="Choose year" min="2000" max="2022" step="1">
            <template v-slot:thumb-label="props">
              <v-icon dark>
                {{ props.value }}
              </v-icon>
            </template>
          </v-range-slider>
        </div>
      </div>

      <!-- Explore -->
      <transition>
        <div v-if="searchedItem.name == null | searchedItem.name == ''" class="col-12">
          <div class="row">
            <div class="col-12"></div>

            <div class="col-12">
              <h2 class="text-white mb-5">
                {{ $t('Explore all genres') }}
              </h2>

              <!-- Genres -->
              <transition-group tag="div" class="row">
                <div v-for="genre in availableGenres" :key="genre.id" class="col-4">
                    <router-link :key="genre.id" :to="{ name: 'genre', params: { genre: genre.viewname } }">
                      <b-card :title="genre.name" :img-src="'http://via.placeholder.com/500'" :img-alt="'a'" text-variant="white" overlay>
                        <b-card-text>
                          Some quick example text to build on the card and make up the bulk of the card's content.
                        </b-card-text>
                      </b-card> 
                    </router-link>
                </div>
              </transition-group>
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
                    {{ $t('See all') }}
                  </router-link>
                </div>
                
                <base-list-songs :songs="songSet" />
              </div>
            </div>
          </b-card>

          <!-- Artists -->
          <b-card id="artists" class="mt-4">
            <div class="row">
              <div class="col-12 text-right">
                <router-link :to="{ name: 'search_more', params: { search: 'artists' } }" class="text-uppercase font-weight-bold text-muted">
                  {{ $t('See all') }}
                </router-link>
              </div>

              <base-list-artists :artists="artistSet" />
            </div>
          </b-card>

          <!-- Albums -->
          <b-card id="albums" class="mt-4">
            <div class="row">
              <div class="col-12 text-right">
                <router-link :to="{ name: 'search_more', params: { search: 'albums' } }" class="text-uppercase font-weight-bold text-muted">
                  {{ $t('See all') }}
                </router-link>
              </div>

              <base-list-albums :albums="albumSet" />
            </div>
          </b-card>

        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapState } from 'vuex'

import BaseListAlbums from '../components/BaseListAlbums.vue'
import BaseListArtists from '../components/BaseListArtists.vue'
import BaseListSongs from '../components/BaseListSongs.vue'

export default {
  name: 'Search',
  components: { BaseListSongs, BaseListArtists, BaseListAlbums },
  data () {
    return {
      showAdvancedSearch: false,

      searchedItem: {
        name: null,
        genre: null,
        area: []
      },

      searchResult: []
    }
  },
  computed: {
    ...mapGetters(['searchAlbums']),
    ...mapState(['availableGenres']),

    // searchQuery() {
    //   return _.map(Object.keys(this.searchedItem), (key) => {
    //     var value = this.searchedItem[key]
    //     if (typeof value == 'object') {
    //       value = _.join(',', value)
    //     }
    //     var instance = new URLSearchParams({ [`${key}`]: value })
    //     return instance.toString()
    //   })
    // },

    songSet () {
      // For each songs, implement some of the
      // album information
      var songSet = []
      _.forEach(this.searchResult, (album) => {
        var songs = album.song_set.map((song) => {
          song['artist'] = { name: album.artist.name }
          song['album'] = { cover_image_thumbnail: album.cover_image_thumbnail }
          return song
        })
        songSet.push(...songs)
      })
      return _.uniqBy(songSet, 'id')
    },

    artistSet () {
      // Returns all the artists present
      // in the search results
      var artistSet = []
      _.forEach(this.searchResult, (album) => {
        artistSet.push(album.artist)
      })
      return _.uniqBy(artistSet, 'id')
    },

    albumSet () {
      // Returns all the albums present
      // in the search results
      var albumSet = []
        _.forEach(this.searchResult, (album) => {
        albumSet.push({ 
          id: album.id, 
          cover_image: album.cover_image,
          cover_image_thumbnail: album.cover_image_thumbnail,
          name: album.name,
          artist: { name: album.artist.name }
        })
      })
      return _.uniqBy(albumSet, 'id')
    }
  },
  watch: {
    'searchedItem.name'(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.search()
      }
    }
  },
  beforeMount () {
    if (this.availableGenres == 0) {
      this.getAvailableGenres()
    } 
  },

  methods: {
    async getAvailableGenres() {
      try {
        console.log(1)
        var response = await this.$axios.get('/artists/genres')
        this.$store.commit('setAvailableGenres', response.data)
      } catch(error) {
        console.log(error)
      }
    },

    async search() {
      try {
        var response = await this.$axios.post('/artists/search', this.searchedItem)
        this.searchResult = response.data
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
  .card {
    background-color: rgba(0, 0, 0, .5);
  }
</style>
