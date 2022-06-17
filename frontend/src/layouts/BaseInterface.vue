<template>
  <section class="main-interface">
    <!-- Left -->
    <div class="left d-flex flex-column justify-content-between">
      <transition name="general">
        <div v-if="$route.name == 'profile'" id="app-navigation">
          <router-link v-for="(profileNavButton, index) in profileNavButtons" :key="index" :to="{ name: profileNavButton.name }" class="nav-button">
            <!-- <font-awesome-icon class="mr-3" :icon="profileNavButton.icon" /> -->
            {{ profileNavButton.name }}
          </router-link>
        </div>

        <div v-else id="app-navigation">
          <router-link v-for="(navButton, index) in navButtons" :key="index" :to="{ name: navButton.to }" class="nav-button ripple-effect">
            <!-- <font-awesome-icon class="mr-3" :icon="navButton.icon" /> -->
            {{ $t(navButton.name) }}
          </router-link>
        </div>
      </transition>

      <div id="profile-navigation">
        <router-link v-if="$route.name == 'profile'" id="nav-button" class="profile-button" :to="{ name: 'home_view' }">
          <!-- <font-awesome-icon class="mr-3" icon="arrow-left" /> -->
          {{ $t('Back to home') }}
        </router-link>

        <router-link v-else id="nav-button" class="nav-button profile" :to="{ name: 'profile_view' }">
          <!-- <font-awesome-icon class="mr-3" icon="cog" /> -->
          {{ $t('Profile') }}
        </router-link>
      </div>
    </div>

    <!-- Center -->
    <div class="center">
      <router-view v-slot="{ Component }">
        <transition name="opacity" mode="in-out">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <!-- Right -->
    <div class="right">
      goog
    </div>
  </section>
</template>

<script>
export default {
  name: 'BaseInterface',
  data: () => ({
    minimizeRight: false,
    navButtons: [
      { name: 'Home', to: 'home_view', icon: 'home' },
      { name: 'Search', to: 'search_view', icon: 'search' },
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
    }
  }
}
</script>

<style scoped>

.main-interface {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: left;
  height: 100vh;
  width: 100%;
}

.left {
  position: sticky;
  width: 30%;
  padding: 1rem;
  /* overflow-y: scroll; */
  background-color: rgba(0, 0, 0, .8);
}

.center {
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.9);
}

.right {
  position: sticky;
  width: 30%;
  padding: 1rem;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.8);
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

.ripple-effect {
  position: relative;
  overflow: hidden;
}
.ink {
  display: block;
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  transform: scale(0);
}

.ink {
  background: #fff;
  opacity: 1;
}

.ink.animate {
  -webkit-animation: ripple-effect 0.5s linear;
  -o-animation: ripple-effect 0.5s linear;
  animation: ripple-effect 0.5s linear;
}

@keyframes ripple-effect {
  100% {
    opacity: 0;
    transform: scale(2.5);
  }
}
</style>
