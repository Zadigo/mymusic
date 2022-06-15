<template>
  <div class="container">
    Some test for you
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log(import.meta.BASE_URL)
  },
  computed: {
    google() {
      return []
    }
  }
}
</script>

<style>
</style>
