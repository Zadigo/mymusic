<template>
  <section id="search" class="p-5">
    <div class="row">
      <div class="col-12">
        <input v-model="searchedItem.name" :placeholder="$t('Search')" type="search" class="form-control p-2 mb-3">

        <a href @click.prevent="showAdvancedSearch = !showAdvancedSearch">
          {{ $t('Advanced search') }}
        </a>

        <div v-if="showAdvancedSearch" class="card my-4 bg-transparent border">
          <div class="card-body">
            <input v-model="searchedItem.genre" :placeholder="$t('Search')" type="search" class="form-control p-2">

            <div>
              <label for="year-selection" class="form-label text-light my-3">Choose a year</label>
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
          <article v-for="genre in genres" :key="genre.id" :aria-label="genre.name" class="col-4">
            <router-link :key="genre.id" :to="{ name: 'genre_view', params: { genre: genre.viewname } }">
              <div class="card text-bg-dark">
                <img :src="require('@/assets/cover.jpg')" alt="" class="card-img">

                <div class="card-img-overlay">
                  <h4 class="card-title">
                    {{ genre.name }}
                  </h4>

                  <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>
            </router-link>
          </article>
        </div>
      </div>

      <div v-else>
        <!-- Songs -->
        <search-section-vue class="mb-2" component-name="list-songs-vue" />

        <!-- Artists -->
        <search-section-vue class="mb-2" component-name="list-artists-vue" />

        <!-- Albums -->
        <search-section-vue component-name="list-albums-vue" />
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from '@/plugins/dayjs'
import SearchSectionVue from '@/components/search/SearchSection.vue'

// TEST
import genresData from '@/data/genres.json'

export default {
  name: 'SearchView',
  components: { SearchSectionVue },
  setup () {
    return {
      genresData
    }
  },
  data () {
    return {
      genres: [],
      showAdvancedSearch: false,
      searchedItem: {
        name: null,
        genre: null,
        year: null,
        area: []
      },
    }
  },
  computed: {
    currentYear () {
      return dayjs().year()
    }
  }, 
  created () {
    this.getGenres()
  },
  methods: {
    async getGenres () {
      try {
        // const response = await this.$http.get('/artists/genres')
        // this.genres = response.data
        this.genres = this.genresData
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
