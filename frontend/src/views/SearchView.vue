<doc>
  User searches for an album or an artist
</doc>

<template>
  <section id="search" class="p-5">
    <!-- Search -->
    <div class="row">
      <div class="col-12">
        <div class="search">
          <v-text-field v-model="searchedItem.name" :placeholder="$t('Search')" variant="outlined" class="text-light" @keyup="handleSearch"></v-text-field>

          <div class="d-flex justify-content-end">
            <v-btn variant="tonal" color="light" rounded @click="showAdvancedSearch = !showAdvancedSearch">
              {{ $t('Advanced search') }}
            </v-btn>
          </div>
        </div>
        
        <!-- Advanced search -->
        <base-card v-if="showAdvancedSearch" class="my-4">
          <template #body>
            <v-text-field v-model="searchedItem.area" :placeholder="$t('Search a genre')" variant="outlined" class="text-light" @keyup="handleSearch"></v-text-field>

            <div class="mt-3">
              <label for="search-year">Select a year</label>
              <v-range-slider id="search-year" v-model="searchedItem.year" :min="1980" :max="currentYear" :step="1" thumb-label="always" hide-details></v-range-slider>
            </div>
          </template>
        </base-card>
      </div>
    </div>
    
    <div class="row mt-4">
      <!-- Explore Genres -->
      <div v-if="searchedItem.name === null || searchedItem.name === ''" class="col-12">
        <h2 class="text-light display-5 mb-5">
          {{ $t('Explore all genres') }}
        </h2>

        <div class="row">
          <article v-for="genre in genres" :key="genre.id" :aria-label="genre.name" class="col-sm-12 col-md-4">
            <base-template-card-vue class="text-bg-primary">
              <router-link :key="genre.id" :to="{ name: 'genre_view', params: { genre: genre.name.toLowerCase() } }" class="text-light">
                <div class="card-body">
                  <h4 class="card-title">
                    {{ genre.name }}
                  </h4>

                  <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </router-link>
            </base-template-card-vue>
          </article>
        </div>
      </div>

      <!-- Search results -->
      <div v-else>
        <!-- Songs -->
        <search-section-vue :section-title="$t('Songs')" class="mb-2" component-name="list-songs-vue" @show-all="showAll = !showAll" />

        <!-- Artists -->
        <search-section-vue :section-title="$t('Artists')" class="mb-2" component-name="list-artists-vue" @show-all="showAll = !showAll" />

        <!-- Albums -->
        <search-section-vue :section-title="$t('Albums')" component-name="list-albums-vue" @show-all="showAll = !showAll" />

        <!-- Show all -->
        <transition name="opacity">
          <div v-if="showAll" class="wrapper">
            <div class="card bg-dark">
              <div class="card-header">
                <button type="button" class="btn-close mx-auto" @click="showAll = false"></button>
              </div>
              
              <div class="card-body">
                <!-- FIXME: When clicking on play in this component, the song does not play plus
                there is a confusion between play and pause -->
                <base-songs-list-group :songs="songs" />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import dayjs from '@/plugins/dayjs'
import { computed } from '@vue/reactivity'
import { asyncTimeout } from '@/composables/utils'

import BaseTemplateCardVue from '@/layouts/bootstrap/cards/BaseTemplateCard.vue'
import BaseCard from '@/layouts/bootstrap/cards/BaseCard.vue'
import BaseSongsListGroup from '@/layouts/BaseSongsListGroup.vue'
import SearchSectionVue from '@/components/search/SearchSection.vue'

export default {
  name: 'SearchView',
  components: { 
    BaseCard,
    BaseSongsListGroup,
    BaseTemplateCardVue,
    SearchSectionVue
  },
  provide () {
    return {
      songs: computed(() => (this.songs)),
      albums: computed(() => this.albums),
      artists: computed(() => this.artists)
    }
  },
  setup () {
    return {
      asyncTimeout
    }
  },
  data () {
    return {
      genres: [],
      showAdvancedSearch: false,
      cachedSearch: [],
      searchedItem: {
        name: null,
        genre: null,
        year: [0, 2023],
        area: []
      },
      showAll: false
    }
  },
  computed: {
    currentYear () {
      // Returns the current year
      return dayjs().year()
    },
    songs () {
      // 
      return this.cachedSearch
    },
    albums () {
      // From each song, get the album
      // details in a unique list
      const items = []
      _.forEach(this.songs, (item) => {
        items.push(item.album)
      })
      return _.uniqBy(items, 'name')
    },
    artists () {
      // For each album definition,
      // get the artist in a unique list
      const items = []
      _.forEach(this.albums, (item) => {
        items.push(item.artist)
      })
      return _.uniqBy(items, 'name')
    }
  },
  created () {
    this.getGenres()
    this.searchedItem.year[0] = this.currentYear - 10
  },
  methods: {
    async getGenres () {
      // Returns the current genres present
      // in the database
      try {
        const response = await this.$http.get('/artists/genres')
        this.genres = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async handleSearch () {
      // Search an artist or an album
      // in the database
      try {
        const response = await this.$http.post('/artists/search', this.searchedItem)
        await this.asyncTimeout(1000)
        this.cachedSearch = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
#search {
  position: relative;
}

.wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding: 1rem;
  z-index: 1055;
}

.wrapper::before {
  content: "";
  filter: blur(3px);
}

.wrapper .card {
  height: 100%;
}
</style>
