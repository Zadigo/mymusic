<template>
  <base-template-card v-slot="{darkMode}">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h4 :class="darkMode ? 'text-light' : 'text-dark'">{{ name }}</h4>
      <router-link v-if="to" :to="to" :class="darkMode ? 'text-light' : 'text-dark'">{{ $t('See all') }}</router-link>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>
  </base-template-card>
</template>


<script>
import BaseTemplateCard from '@/layouts/bootstrap/cards/BaseTemplateCard.vue'

export default {
  name: 'BaseSection',
  components: {
    BaseTemplateCard
  },
  props: {
    name: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: false
    }
  }
}
</script>
