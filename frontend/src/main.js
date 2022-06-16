// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-ui-kit/css/mdb.min.css'
import '@mdi/font/css/materialdesignicons.css'
import './plugins/webfontloader'
import i18n from './i18n'
import createAxios from './plugins/axios'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(createAxios())
app.use(i18n)
app.use(pinia)
app.mount('#app')
