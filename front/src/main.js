import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/style.css'

// Styling

import './plugins/bootstrap-vue'
import vuetify from './plugins/vuetify'
import './plugins/fontawesome'

import './components'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
