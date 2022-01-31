<template>
  <div id="app">
    <v-app>
        <router-view :key="$route.name" />
      <!-- <transition name="general">
      </transition> -->
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  .general-enter-active,
  .general-leave-active {
    transition: all .3s ease;
  }
  .general-enter,
  .general-leave-to {
    opacity: 0;
  }
  .general-enter-to,
  .general-leave {
    opacity: 1;
  }

  .scale-enter-active,
  .scale-leave-active {
    transition: all .3s ease;
  }
  .scale-enter,
  .scale-leave-to {
    opacity: 0;
    transform: scale(.98, .98);
  }
  .scale-enter-to,
  .scale-leave {
    opacity: 1;
    transform: scale(1, 1);
  }

  ::-webkit-scrollbar {
    width: .25em;
  }
  
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    /* outline: 1px solid slategrey; */
  }
</style>
