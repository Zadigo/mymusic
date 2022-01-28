<template>
  <section class="main-interface">
    <div class="left d-flex flex-column justify-content-between">
      <div id="app-navigation">
        <router-link v-for="(navButton, index) in navButtons" id="nav-button" :key="index" :to="{ name: navButton.name }">
          <font-awesome-icon class="mr-3" :icon="navButton.icon" />
          {{ navButton.name }}
        </router-link>
      </div>

      <div id="profile">
        <router-link id="nav-button" class="profile-button" :to="{ name: 'profile' }">
          <font-awesome-icon class="mr-3" icon="cog" />
          Profile
        </router-link>
      </div>
    </div>

    <div class="center p-3">
      <router-view />
    </div>
    
    <div :class="{ minimize: minimizeSocials }" class="right">
      <div class="row">
        <div class="col-12">
          <v-btn icons @click="doMinimizeSocials">
            <font-awesome-icon v-if="minimizeSocials" icon="chevron-left"></font-awesome-icon>
            <font-awesome-icon v-else icon="chevron-right" />
          </v-btn>

          <div class="col-12 mt-5">
            <!-- Mini player -->
            <v-btn>
              <font-awesome-icon icon="play" />
            </v-btn>
            <v-btn class="mt-2">
              <font-awesome-icon icon="step-backward" />
            </v-btn>
            <v-btn class="mt-2">
              <font-awesome-icon icon="step-forward" />
            </v-btn>
            <v-btn class="mt-2">
              <font-awesome-icon icon="redo-alt" />
            </v-btn>
            <v-btn class="mt-2">
              <font-awesome-icon icon="random" />
            </v-btn>
          </div>
        </div>
      </div>

    </div>

    <mini-player class="d-none" />
  </section>
</template>

<script>
var _ = require('lodash')

import MiniPlayer from './MiniPlayer.vue'

export default {
  name: 'BaseInterface',

  components: {
    MiniPlayer
  },

  data () {
    return {
      minimizeSocials: false,
      navButtons: [
        { name: 'home', icon: 'home'},
        { name: 'search', icon: 'search'},
        { name: 'playlists', icon: 'list'},
      ]
    }
  },

  beforeMount() {
    var currentSettings = JSON.parse(localStorage.getItem('s'))
    var socialsIsMinimized = currentSettings['minimize_socials']
    if (socialsIsMinimized !== undefined) {
      this.minimizeSocials = socialsIsMinimized
    }
  },

  methods: {
    doMinimizeSocials () {
      this.minimizeSocials = !this.minimizeSocials
      // Store the current state in the local storage
      // so that the user does not have to minimize
      // this all the time
      var currentSettings = localStorage.getItem('s')
      if (!_.isNull(currentSettings)) {
        var settings = JSON.parse(currentSettings)
        settings['minimize_socials'] = this.minimizeSocials
        localStorage.setItem('s', JSON.stringify(settings))
      } else {
        localStorage.setItem('s', JSON.stringify({ minimize_socials: this.minimizeSocials }))
      }
    }
  }
}
</script>

<style scoped>
  .main-interface {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: left;
  }

  .left {
    position: sticky;
    width: 30%;
    padding: 1rem;
    background-color: #343a40;
    /* background-color: red; */
  }

  .center {
    width: 100%;
    overflow-y: scroll;
    /* padding: 1rem; */
    background-color: #6c757d;
  }
  
  .right {
    position: sticky;
    width: 30%;
    padding: 1rem;
    background-color: #343a40;
    overflow: hidden;
  }

  .right.minimize {
    width: 15%;
    text-align: center;
    padding: 1rem;
  }

  .center::-webkit-scrollbar {
    width: .25em;
  }
  
  .center::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }
  
  .center::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    /* outline: 1px solid slategrey; */
  }

  #nav-button {
    display: block;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: .5rem;
    text-decoration: none;
    color: #f8f9fa;
    text-transform: uppercase;
    font-size: .9rem;
    font-weight: bold;
  }

  #nav-button.router-link-exact-active {
    color: white;
    /* border: 1px solid #f8f9fa; */
  }

  #nav-button.profile-button {
    background-color: rgba(41, 128, 185, .5);
  }
</style>
