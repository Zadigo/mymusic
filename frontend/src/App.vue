<template>
  <router-view v-slot="{ Component }">
    <transition :key="$route.name" name="opacity" mode="in-out">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { usePlaylists } from './store/playlists'
import testplaylists from './data/test_playlists.json'
export default {
  name: 'App',
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
        const hasPlaylists = this.sessionStorage.hasPlaylists
        if (!hasPlaylists) {
          const result = testplaylists
          this.store.$patch({
            playlists: result
          })
          this.$session.create('hasPlaylists', true)
          this.$session.create('playlists', result)
        } else {
          this.store.playlists = this.$session.retrieve('playlists')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
.opacity-enter-active,
.opacity-leave-active {
  transition: all .3 cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
  transform: scaleX(-16px);
}

.opacity-leave-from,
.opacity-enter-to {
  opacity: 1;
  transform: scaleX(0px);
}
</style>
