import { createRouter, createWebHistory } from 'vue-router'
import { loadView } from '../utils'

const routes = [
  {
    path: '/',
    name: 'home_view',
    component: loadView('HomeView')
  },
  {
    path: '/:lang',
    component: {
      template: '<router-view></router-view>'
    },
    children: []
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
