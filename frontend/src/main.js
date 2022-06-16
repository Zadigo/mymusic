// import { createApp } from 'vue'
import { createApp, markRaw } from 'vue/dist/vue.esm-bundler'
import { createPinia } from 'pinia'
import { createVueSession } from './plugins/vue-storages/session-storage'
import { createVueLocalStorage } from './plugins/vue-storages/local-storage'
import createAxios from './plugins/axios'
import App from './App.vue'

import router from './router'
import i18n from './i18n'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-ui-kit/css/mdb.min.css'
import '@mdi/font/css/materialdesignicons.css'
import './plugins/webfontloader'

const pinia = createPinia()
const session = createVueSession()
const localstorage = createVueLocalStorage()

pinia.use(({ store }) => {
    store.$localStorage = markRaw(localstorage)
    store.$session = markRaw(session)
})

const app = createApp(App)
app.use(router)
app.use(createAxios())
app.use(session)
app.use(localstorage)
app.use(i18n)
app.use(pinia)
app.mount('#app')
