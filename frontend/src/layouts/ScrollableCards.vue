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
  height: .25em;
}

.wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .2);
}

.wrapper::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}
</style>
