<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <transition :key="$route.name" name="opacity" mode="in-out">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<script>
import { provide } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useAuthentication } from './store/authentication'

export default {
  name: 'App',
  setup () {
    const darkMode = useDark({
      selector: 'body',
      attribute: 'color-scheme',
      valueDark: 'dark',
      valueLight: 'light',
    })
    const toggleDark = useToggle(darkMode)
    provide('darkMode', true)

    const { loadUserSession } = useAuthentication()

    return {
      toggleDark,
      loadUserSession
    }
  },
  mounted () {
    this.loadUserSession()
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

.opacity-enter-to,
.opacity-leave-from {
  opacity: 1;
  transform: scaleX(0px)
}
</style>
