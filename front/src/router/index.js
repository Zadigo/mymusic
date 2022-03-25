import Vue from 'vue'
import VueRouter from 'vue-router'

import BaseInterface from '../components/BaseInterface.vue'

Vue.use(VueRouter)

const routes = [
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
      },
      {
        path: 'search',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
      },
      {
        path: 'search/:search(\\w+)',
        name: 'search_more',
        component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
      },
      {
        path: 'genres/:genre(\\w+)',
        name: 'genre',
        component: () => import(/* webpackChunkName: "genre" */ '../views/ExploreByGenre.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
