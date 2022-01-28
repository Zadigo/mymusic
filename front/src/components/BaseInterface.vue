<template>
  <section class="main-interface">
    <div class="left">
      <b-link :to="{ name: 'home' }">Home</b-link>
      <b-link :to="{ name: 'search' }">Search</b-link>
      <b-link :to="{ name: 'playlists' }">Playlists</b-link>
    </div>

    <div class="center p-3">
      <router-view />
    </div>
    
    <div class="right">b</div>

    <mini-player class="d-none" />
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
    position: sticky;
    width: 30%;
    padding: 1rem;
    /* background-color: red; */
  }

  .center {
    width: 100%;
    overflow-y: scroll;
    /* padding: 1rem; */
    /* background-color: blue; */
  }
  
  .right {
    position: sticky;
    width: 30%;
    padding: 1rem;
    /* background-color: black; */
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
</style>
