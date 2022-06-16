<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <router-view v-slot="{ Component }">
          <transition name="opacity" mode="in-out">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.info(import.meta.env)
  }
}
</script>

<style>
</style>
