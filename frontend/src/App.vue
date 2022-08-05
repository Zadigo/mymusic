<template>
  <base-messages />
  <router-view v-slot="{ Component }">
    <transition :key="$route.name" name="opacity" mode="in-out">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { usePlaylists } from './store/playlists'
import BaseMessages from './components/BaseMessages.vue'

export default {
  name: "App",
  components: {
    BaseMessages
  },
  setup () {
    const store = usePlaylists()
    return {
      store
    }
  },
  created () {
    this.getPlaylists()
  },
  methods: {
    async getPlaylists () {
      try {
        if (!this.sessionStorage.hasPlaylists) {
          const response = await this.$http.post('/playlists/')
          console.info('playlists', response)
          this.store.$patch((state) => {
            state.playlists = response.data

            this.$session.create('hasPlaylists', true)
            this.$session.create('playlists', response.data)
          })
        } else {
          this.store.playlists = this.$session.retrieve('playlists')
        }
      } catch (error) {
        this.store.addErrorMessage(error)
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
