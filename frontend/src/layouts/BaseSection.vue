<template>
  <div class="card bg-dark text-light">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4>{{ name }}</h4>
      See all
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  name: 'GenreView',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
