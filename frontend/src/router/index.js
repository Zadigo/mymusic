import { createRouter, createWebHistory } from 'vue-router'
import { loadLayout, loadView } from '../utils'

const routes = [
  {
    path: '',
    component: loadLayout('BaseInterface'),
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
        path: '/playlists',
        name: 'playlists_view',
        component: loadView('PlaylistsView')
      },
      {
        path: '/playlists',
        name: 'profile_view',
        component: loadView('PlaylistsView')
      },
      {
        path: '/playlist/:id(\\d+)',
        name: 'playlist_view',
        component: loadView('PlaylistView')
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
