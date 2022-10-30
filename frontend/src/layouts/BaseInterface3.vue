<template>
  <section class="main-interface">
    <div class="left">
      <transition name="general">
        <div v-if="$route.name === 'profile'" id="app-navigation">
          <router-link v-for="(profileNavButton, index) in profileNavButtons" :key="index" :to="{ name: profileNavButton.name }" class="nav-button">
            <font-awesome-icon class="me-3" :icon="`fa-solid fa-${profileNavButton.icon}`" />
            {{ profileNavButton.name }}
          </router-link>
        </div>
      
        <div v-else id="app-navigation">
          <router-link v-for="(navButton, index) in navButtons" :key="index" :to="{ name: navButton.to }" class="nav-button ripple-effect">
            <font-awesome-icon class="me-3" :icon="navButton.icon" />
            {{ $t(navButton.name) }}
          </router-link>
        </div>
      </transition>
      
      <div id="profile-navigation">
        <router-link v-if="$route.name == 'profile'" id="nav-button" class="profile-button" :to="{ name: 'home_view' }">
          <font-awesome-icon class="me-3" icon="arrow-left" />
          {{ $t('Back to home') }}
        </router-link>
      
        <router-link v-else id="nav-button" class="nav-button profile" :to="{ name: 'profile_view' }">
          <font-awesome-icon class="me-3" icon="fa-solid fa-cog" />
          {{ $t('Profile') }}
        </router-link>
      </div>
    </div>

    <div class="right">
      <router-view v-slot="{ Component }">
        <transition name="opacity" mode="in-out">
          <component :is="Component" @display-alert="displayAlert" />
        </transition>
      </router-view>
    </div>

    <div class="bottom">
      <base-music-player-vue :src="mediaUrl(player.currentSong.song_file)" :toggle-play="player.isPlaying" @playing="player.play(player.currentSong)" @paused="player.pause()" />
    </div>
  </section>
</template>

<script>
import { useUrls } from '@/composables/utils'
import { usePlayer } from '../store/player'

import BaseMusicPlayerVue from './BaseMusicPlayer.vue'
// import VueBasicAlert from 'vue-basic-alert'

export default {
  name: 'BaseInterface',
  components: {
    BaseMusicPlayerVue
    // VueBasicAlert
  },
  setup () {
    const { mediaUrl } = useUrls()
    const player = usePlayer()
    return {
      mediaUrl,
      player
    }
  },
  data: () => ({
    minimizeRight: false,
    navButtons: [
      { name: 'Home', to: 'home_view', icon: 'home' },
      { name: 'Search', to: 'search_view', icon: 'magnifying-glass' },
      { name: 'Playlists', to: 'playlists_view', icon: 'list' }
    ]
  }),
  beforeMount () {
    const currentSettings = this.localStorage.settings
    if (currentSettings) {
      // Do something here
    }
  },
  methods: {
    minimize () {
      this.minimizeRight = !this.minimizeRight
      let settings = this.$localstorage.retrieve('settings')
      settings = settings || {}
      settings.minimized = this.minimizeRight
    },
    displayAlert (type, title, content) {
      this.$refs.alert.showAlert(type, content, title)
    }
  }
}
</script>

<style scoped>
.main-interface {
  position: relative;
  display: grid;
  grid-template-areas:
    "side body"
    "side player";
  grid-template-rows: 1fr max-content;
  grid-template-columns: 15% 1fr;
  width: 100%;
  height: 100vh;
}

.main-interface .left {
  grid-area: side;
  position: sticky;
  padding: 1rem;
  background-color: rgba(0, 0, 0, .8);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.main-interface .right {
  grid-area: body;
  width: 100%;
  /* height: 100vh; */
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.9);
}

.main-interface .bottom {
  grid-area: player;
  /* position: fixed; */
  /* left: 0; */
  /* bottom: 0; */
  background-color: rgba(38, 38, 38, 1) !important;
  width: 100%;
  height: auto;
  z-index: 1000;
}

.right::-webkit-scrollbar {
  width: .25em;
}

.right::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}

.right::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}

.nav-button {
  display: block;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: .5rem;
  text-decoration: none;
  /* color: #f8f9fa; */
  color: #fff;
  text-transform: uppercase;
  font-size: .9rem;
  font-weight: 500;
  border: 0;
}

.nav-button.router-link-exact-active,
.nav-button.active {
  color: #fff;
  background-color: #0d6efd;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%);
}

.nav-button.profile-button {
  background-color: rgba(41, 128, 185, .5);
}

.nav-button.profile {
  background-color: rgba(41, 128, 185, .5);
}
</style>
