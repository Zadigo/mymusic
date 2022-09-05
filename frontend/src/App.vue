<template>
  <!-- Messages -->
  <!-- <base-messages /> -->
  <vue-basic-alert ref="alert" :duration="300" />

  <router-view v-slot="{ Component }">
    <transition :key="$route.name" name="opacity" mode="in-out">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { usePlaylists } from './store/playlists'
import { useDark, useToggle } from '@vueuse/core'
import { provide } from 'vue'

import VueBasicAlert from 'vue-basic-alert'
// import BaseMessages from './components/BaseMessages.vue'

export default {
  name: 'App',
  components: {
    VueBasicAlert
    // BaseMessages
  },
  setup () {
    const store = usePlaylists()
    const darkMode = useDark()
    const toggleDark = useToggle(darkMode)
    provide('darkMode', darkMode)
    return {
      store,
      toggleDark
    }
  },
  created () {
    this.getPlaylists()
  },
  methods: {
    async getPlaylists () {
      try {
        if (!this.sessionStorage.hasPlaylists) {
          const response = await this.$http.get('playlists')
          this.store.$patch((state) => {
            state.playlists = response.data

            this.$session.create('hasPlaylists', true)
            this.$session.create('playlists', response.data)
          })
        } else {
          this.store.playlists = this.sessionStorage.playlists
        }
      } catch (error) {
        this.$refs.alert.showAlert('error', error.message, 'PLA-RE')
      }
    }
  }
}
</script>

<style>
* {
  font-family: Montserrat, Roboto, sans-serif;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: all .3 cubic-bezier(0.445, 0.05, 0.55, 0.95)
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
  transform: scaleX(-16px)
}

.opacity-leave-from,
.opacity-enter-to {
  opacity: 1;
  transform: scaleX(0px)
}
</style>
