import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// Styling

import vuetify from './plugins/vuetify'
import './assets/style.css'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'

// Plugins

import globalPlugins from './plugins'

// Components

import './plugins/audio_player'

Vue.config.productionTip = false

// Plugins

Vue.use(globalPlugins)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
