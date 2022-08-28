<template>
  <div v-if="!byGenre" class="list-group">
    <a v-for="i in 4" :key="i" href class="list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center" @click.prevent>
      <div class="d-flex flex-column">
        <span>Fess ka fè bang <font-awesome-icon icon="fa-solid fa-e" class="ms-3" /></span>
        <span class="text-muted">Jahlys</span>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-primary btn-sm">
          <font-awesome-icon icon="fa-solid fa-play"></font-awesome-icon>
        </button>

        <button type="button" class="btn btn-primary btn-sm">
          <font-awesome-icon icon="fa-solid fa-heart"></font-awesome-icon>
        </button>

        <button type="button" class="btn btn-primary btn-sm">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"></font-awesome-icon>
        </button>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'BaseSongsListGroup',
  props: {
    byGenre: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
button {
  width: 40px;
}
</style>
