<template>
  <ul class="nav nav-pills">
    <li v-for="pill in pills" :key="pill" class="nav-item">
      <a :class="[selected == pill ? 'active' : null]" class="nav-link" href @click.prevent="select(pill)">
        {{ $t(pill) }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseNavPills',
  props: {
    pills: {
      type: Array,
      required: true
    }
  },
  emits: {
    'pill-click': () => true
  },
  data () {
    return {
      selected: null
    }
  },
  created () {
    this.selected = this.pills[0]
  },
  methods: {
    select (pill) {
      this.selected = pill
      this.$emit('pill-click', pill)
    }
  }
}
</script>
