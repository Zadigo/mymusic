import Vue from 'vue'
import VueRouter from 'vue-router'

import BaseInterface from '../components/BaseInterface.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  // },
  // {
  //   path: '/playlists',
  //   component: {
  //     default: null
  //   },
  //   components: [
  //     {
  //       path: '',
  //       name: 'playlists',
  //       component: () => import(/* webpackChunkName: "playlist" */ '../views/PlaylistDetails.vue')
  //     },
  //     {
  //       path: ':id(\\d+)',
  //       name: 'playlist',
  //       component: () => import(/* webpackChunkName: "playlist" */ '../views/PlaylistDetails.vue')
  //     }
  //   ]
  // }
  {
    path: '/',
    component: BaseInterface,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: 'playlists',
        name: 'playlists',
        component: () => import(/* webpackChunkName: "playlist" */ '../views/Playlists.vue')
      },
      {
        path: 'playlists/:id(\\d+)',
        name: 'playlist',
        component: () => import(/* webpackChunkName: "playlist" */ '../views/Playlist.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
