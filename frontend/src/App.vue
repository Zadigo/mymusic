<template>
  <div class="container">
    Some test for you
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.info(import.meta.env.VITE_BASE_URL)
  }
}
</script>

<style>
</style>
