import { createRouter, createWebHistory } from 'vue-router'
import { loadLayout, loadView } from '../utils'

const routes = [
  {
    path: '',
    component: loadLayout('BaseInterface3'),
    children: [
      {
        path: '',
        name: 'home_view',
        component: loadView('HomeView')
      },
      {
        path: '/search',
        name: 'search_view',
        component: loadView('SearchView')
      },
      {
        path: '/search/all/:search(\\w+)',
        name: 'search_more_view',
        component: loadView('SearchView')
      },
      {
        path: '/genre/:genre(\\w+)',
        name: 'genre_view',
        component: loadView('GenreView')
      },
      {
        path: '/playlists',
        name: 'playlists_view',
        component: loadView('PlaylistsView')
      },
      {
        path: '/playlists/:id(\\d+)',
        name: 'playlist_view',
        component: loadView('PlaylistView')
      },
      {
        path: '/artist/:id([a-zA-Z0-9]+)',
        name: 'artist_view',
        component: loadView('ArtistView')
      },
      {
        path: '/album/:id([a-zA-Z0-9]+)',
        name: 'album_view',
        component: loadView('AlbumView')
      },
      {
        path: '/profile',
        name: 'profile_view',
        meta: {
          requiresAuthentication: true
        },
        component: loadView('ProfileView')
      },
      {
        path: '/charts',
        name: 'charts_view',
        meta: {
          requiresAuthentication: true
        },
        component: loadView('ChartsView')
      }
    ]
  }
  // {
  //   path: '/:lang',
  //   component: {
  //     template: '<router-view></router-view>'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'home_view',
  //       component: loadView('HomeView')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
