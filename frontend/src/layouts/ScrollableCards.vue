<template>
  <div class="row">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  overflow-x: scroll;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem;
  overflow-x: scroll;
  scroll-behavior: smooth;
}

.wrapper::-webkit-scrollbar {
  transition: all .3s ease;
  scroll-behavior: smooth;
  background-color: white;
  height: 5px;
}

.wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, .2);
  border-radius: .5rem;
}

/* .wrapper .card {
  min-width: 150px;
} */
</style>
