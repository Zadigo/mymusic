import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '../i18n'
import { loadView } from '../utils'
import BaseInterface from '../layouts/BaseInterface.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:lang',
    component: {
      render: h => h('router-view')
    },
    children: [
      {
        path: '',
        component: BaseInterface,
        children: [
          {
            path: '',
            name: 'home_view',
            component: loadView('HomeView')
          },
          {
            path: 'playlists',
            name: 'playlists_view',
            component: loadView('PlaylistsView')
          },
          {
            path: 'playlists/:id(\\d+)',
            name: 'playlist_view',
            component: loadView('PlaylistView')
          },
          {
            path: 'search',
            name: 'search_view',
            component: loadView('SearchView')
          },
          {
            path: 'search/:search(\\w+)',
            name: 'search_more_view',
            component: loadView('SearchView')
          },
          {
            path: 'genres/:genre(\\w+)',
            name: 'genre_view',
            component: loadView('ExploreByGenreView')
          },
          {
            path: 'profile',
            name: 'profile_view',
            component: loadView('ProfileView')
          }
        ]
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  var localeLanguage = to.params.lang
  // var supportedLanguages = process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
  var supportedLanguages = ['en', 'fr']

  if (!supportedLanguages.includes(localeLanguage)) { return next('en') }
  if (i18n.locale !== localeLanguage) { i18n.locale = localeLanguage }

  next()
})

export default router
