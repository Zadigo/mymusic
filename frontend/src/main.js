// import { createApp } from 'vue'
import { createApp, markRaw } from 'vue/dist/vue.esm-bundler'
import { createPinia } from 'pinia'
import { createVueSession } from './plugins/vue-storages/session-storage'
import { createLocalStorage } from './plugins/vue-storages/local-storage'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import createAxios from './plugins/axios'
import App from './App.vue'

import router from './router'
import i18n from './i18n'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-ui-kit/css/mdb.min.css'
import '@mdi/font/css/materialdesignicons.css'
import './plugins/webfontloader'
import './plugins/fontawesome'
import messages from './store/messages'

const pinia = createPinia()
const session = createVueSession()
const localstorage = createLocalStorage()
const app = createApp(App)

pinia.use(({ store }) => {
  store.$localStorage = markRaw(localstorage)
  store.$session = markRaw(session)
})

pinia.use(messages)

app.use(router)
app.use(createAxios())
app.use(session)
app.use(localstorage)
app.use(i18n)
app.use(pinia)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
