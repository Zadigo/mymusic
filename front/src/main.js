import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// Styling

import vuetify from './plugins/vuetify'
import './assets/style.css'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'

// Components

import './plugins/audio_player'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
