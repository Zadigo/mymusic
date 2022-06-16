import { createRouter, createWebHistory } from 'vue-router'
import { loadView } from '../utils'

const routes = [
  {
    path: '/',
    name: 'home_view',
    component: loadView('HomeView')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
