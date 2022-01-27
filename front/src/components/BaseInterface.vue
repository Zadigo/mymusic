<template>
  <section class="main-interface">
    <div class="left">
      <b-link :to="{ name: 'home' }">Home</b-link>
      <b-link :to="{ name: 'playlists' }">Playlists</b-link>
    </div>

    <div class="center px-3 px-3">
      <router-view />
    </div>
    
    <div class="right">b</div>

    <mini-player />
  </section>
</template>

<script>
import MiniPlayer from './MiniPlayer.vue'

export default {
  name: 'BaseInterface',
  components: {
    MiniPlayer
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
    width: 30%;
    padding: 1rem;
    /* background-color: red; */
  }

  .center {
    width: 100%;
    /* padding: 1rem; */
    /* background-color: blue; */
  }
  
  .right {
    width: 30%;
    padding: 1rem;
    /* background-color: black; */
  }
</style>
