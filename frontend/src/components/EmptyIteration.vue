<template>
  <div class="row">
    <div class="col-12">
      <div class="card bg-transparent shadow-none text-muted text-center">
        <div class="card-content">
          <font-awesome-icon icon="fa-solid fa-icons" class="mb-4" size="5x" />
          <h4 class="display-5">
            {{ content }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyIteration',
  props: {
    content: {
      type: String,
      default: 'There are no playlists available'
    }
  }
  
}
</script>
