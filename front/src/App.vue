<template>
  <div id="app">
    <v-app>
      <transition name="general">
        <router-view :key="$route.name" />
      </transition>
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
</style>
