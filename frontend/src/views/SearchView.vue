<template>
  <section id="search" class="p-5">
    <div class="row">
      <div class="col-12">
        <input v-model="searchedItem.name" :placeholder="$t('Search')" type="search" class="form-control p-2 mb-3" @keyup="search">
        <!-- NOTE: For testing -->
        <!-- <button type="button" @click="search">{{ $t('Search') }}</button> -->

        <a href @click.prevent="showAdvancedSearch = !showAdvancedSearch">
          {{ $t('Advanced search') }}
        </a>

        <div v-if="showAdvancedSearch" class="card my-4 bg-transparent border">
          <div class="card-body">
            <input v-model="searchedItem.genre" :placeholder="$t('Search')" type="search" class="form-control p-2">
            <div>
              <label for="year-selection" class="form-label text-light my-3">{{ $t('Choose a year') }}</label>
              <input id="year-selection" v-model.number="searchedItem.year" :max="currentYear" min="2000" step="1" type="range" class="form-range">
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="row">
      <div v-if="searchedItem.name === null || searchedItem.name === ''" class="col-12">
        <h2 class="text-light display-5 mb-5">
          {{ $t('Explore all genres') }}
        </h2>

        <div class="row">
          <article v-for="genre in genres" :key="genre.id" :aria-label="genre.name" class="col-sm-12 col-md-4">
            <div class="card text-bg-primary">
              <router-link :key="genre.id" :to="{ name: 'genre_view', params: { genre: genre.viewname } }" class="text-light">
                <!-- <img :src="require('@/assets/cover.jpg')" alt="" class="card-img"> -->

                <!-- <div class="card-img-overlay"> -->
                <div class="card-body">
                  <h4 class="card-title">
                    {{ genre.name }}
                  </h4>

                  <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </router-link>
            </div>
          </article>
        </div>
      </div>

      <div v-else>
        <!-- Songs -->
        <search-section-vue :section-title="$t('Songs')" class="mb-2" component-name="list-songs-vue" @show-all="showAll = !showAll" />

        <!-- Artists -->
        <search-section-vue :section-title="$t('Artists')" class="mb-2" component-name="list-artists-vue" @show-all="showAll = !showAll" />

        <!-- Albums -->
        <search-section-vue :section-title="$t('Albums')" component-name="list-albums-vue" @show-all="showAll = !showAll" />

        <!-- All -->
        <transition name="opacity">
          <div v-if="showAll" class="wrapper">
            <div class="card bg-dark">
              <div class="card-header">
                <button type="button" class="btn-close mx-auto" @click="showAll = false"></button>
              </div>
              
              <div class="card-body">
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

import BaseSongsListGroup from '@/layouts/BaseSongsListGroup.vue'
import SearchSectionVue from '@/components/search/SearchSection.vue'

export default {
  name: 'SearchView',
  components: { SearchSectionVue, BaseSongsListGroup },
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
        year: null,
        area: []
      },
      showAll: false
    }
  },
  computed: {
    currentYear () {
      return dayjs().year()
    },
    songs () {
      return this.cachedSearch
    },
    albums () {
      const items = []
      _.forEach(this.songs, (item) => {
        items.push(item.album)
      })
      return _.uniqBy(items, 'name')
    },
    artists () {
      const items = []
      _.forEach(this.albums, (item) => {
        items.push(item.artist)
      })
      return _.uniqBy(items, 'name')
    }
  },
  created () {
    this.getGenres()
  },
  methods: {
    async getGenres () {
      try {
        const response = await this.$http.get('/artists/genres')
        this.genres = response.data
      } catch (error) {
        console.log(error)
      }
    },
    async search () {
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
