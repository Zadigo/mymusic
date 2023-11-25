// import { createApp, markRaw } from 'vue/dist/vue.esm-bundler'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
// import { createVueSession } from './plugins/vue-storages/session-storage'
// import { createLocalStorage } from './plugins/vue-storages'
import { createVueSession, createVueLocalStorage } from './plugins/vue-storages'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createVuetify } from 'vuetify'
import createAxios from './plugins/axios'

import App from './App.vue'

import router from './router'
import i18n from './i18n'
import messages from './store/messages'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdb-ui-kit/css/mdb.min.css'
import '@mdi/font/css/materialdesignicons.css'
import './plugins/webfontloader'
import './plugins/fontawesome'

const pinia = createPinia()
const session = createVueSession()
const localstorage = createVueLocalStorage()
const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

pinia.use(({ store }) => {
  store.$localStorage = markRaw(localstorage)
  store.$session = markRaw(session)
})
pinia.use(messages)
app.use(router)
app.use(createAxios())
app.use(vuetify)
app.use(session)
app.use(localstorage)
app.use(i18n)
app.use(pinia)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
