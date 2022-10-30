<template>
  <section :class="mainInterfaceClasses" class="main-interface">
    <div class="left">
      <transition name="general">
        <div v-if="$route.name === 'profile_view'" id="app-navigation">
          <button v-for="(profileNavButton, index) in profileNavButtons" :key="index" :class="{ active: profileNavButton.component === store.profileComponentName }" type="button" class="nav-button" @click="store.profileComponentName=profileNavButton.component">
            <font-awesome-icon class="me-3" :icon="`fa-solid fa-${profileNavButton.icon}`" />
            <span>{{ $t(profileNavButton.name) }}</span>
          </button>
        </div>
      
        <div v-else id="app-navigation">
          <router-link v-for="(navButton, index) in navButtons" :key="index" :to="{ name: navButton.to }" class="nav-button ripple-effect">
            <font-awesome-icon class="me-3" :icon="navButton.icon" />
            <span>{{ $t(navButton.name) }}</span>
          </router-link>
        </div>
      </transition>
      
      <div id="profile-navigation">
        <router-link v-if="$route.name == 'profile_view'" class="nav-button profile-button" :to="{ name: 'home_view' }">
          <font-awesome-icon class="me-3" icon="fa-solid fa-arrow-left" />
          <span>{{ $t('Back to home') }}</span>
        </router-link>
      
        <router-link v-else id="nav-button" class="nav-button profile" :to="{ name: 'profile_view' }">
          <font-awesome-icon class="me-3" icon="fa-solid fa-cog" />
          <span>{{ $t('Profile') }}</span>
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
      <div class="container">
        <div class="px-5 mx-5">
          <!-- <base-music-player-vue :src="player.getCurrentSongFile" :toggle-play="player.isPlaying" @playing="player.play(player.currentSong)" @paused="player.pause()" /> -->
          <base-music-player-vue :src="player.getCurrentSongFile" :toggle-play="player.isPlaying" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUrls } from '@/composables/utils'
import { usePlayer } from '../store/player'
import { useAuthentication } from '@/store/authentication'

import BaseMusicPlayerVue from './BaseMusicPlayer.vue'
// import VueBasicAlert from 'vue-basic-alert'

export default {
  name: 'BaseInterface',
  components: {
    BaseMusicPlayerVue
    // VueBasicAlert
  },
  setup () {
    const store = useAuthentication()
    const { mediaUrl } = useUrls()
    const player = usePlayer()
    return {
      store,
      mediaUrl,
      player
    }
  },
  data () {
    return {
      minimizeLeft: false,
      navButtons: [
        { name: 'Home', to: 'home_view', icon: 'home' },
        { name: 'Search', to: 'search_view', icon: 'magnifying-glass' },
        { name: 'Playlists', to: 'playlists_view', icon: 'list' },
        { name: 'Charts', to: 'charts_view', icon: 'chart-simple' }
      ],
      profileNavButtons: [
        // { name: 'Home', to: 'home_view', icon: 'home'},
        { name: 'Account', component: 'profile-overview', icon: 'home' },
        { name: 'Notifications', component: 'notifications-choices', icon: 'bell' },
        // { name: 'available_plans', icon: 'credit-card' },
        // { name: 'password', icon: 'key' },
        // { name: 'privacy_settings', icon: 'lock' },
        // { name: 'recover_playlists', icon: 'redo-alt' },
        // { name: 'receipts', icon: 'receipt' },
        // { name: 'apps', icon: 'app'},
        // { name: 'delete_account', icon: 'trash-alt'}s
      ]
    }
  },
  computed: {
    mainInterfaceClasses () {
      return [
        {
          'minimize': this.minimizeLeft
        }
      ]
    }
  },
  beforeMount () {
    const currentSettings = this.localStorage.settings
    if (currentSettings) {
      // Do something here
    }
  },
  methods: {
    minimize () {
      this.minimizeLeft = !this.minimizeLeft
      let settings = this.$localstorage.retrieve('settings')
      settings = settings || {}
      settings.minimized = this.minimizeLeft
      this.$localstorage.create(settings)
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

.main-interface.minimize {
  position: relative;
  display: grid;
  grid-template-areas:
    "side body"
    "side player";
  grid-template-rows: 1fr max-content;
  grid-template-columns: 6% 1fr;
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
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.9);
}

.main-interface .bottom {
  grid-area: player;
  background-color: rgba(38, 38, 38, 1) !important;
  width: 100%;
  height: auto;
  z-index: 1000;
}

.main-interface.minimize .left a span {
  display: none;
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
