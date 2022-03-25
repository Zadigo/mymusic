import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

// Styling

import vuetify from './plugins/vuetify'
import './assets/style.css'
import './plugins/bootstrap-vue'
import './plugins/fontawesome'

// Plugins
import globalPlugins from './plugins'

// Components
import './plugins/audio_player'

// Mixins
import './mixins'


Vue.config.productionTip = false

// Plugins

Vue.use(globalPlugins)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
