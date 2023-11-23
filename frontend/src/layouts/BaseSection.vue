<template>
  <base-template-card v-slot="{darkMode}">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h1 :class="darkMode ? 'text-light' : 'text-dark'" class="mb-0 h3">
        {{ $t(name) }}
      </h1>

      <!-- <router-link v-if="to" :to="to" :class="darkMode ? 'text-light' : 'text-dark'">
        {{ $t('See all') }}
      </router-link> -->
      <v-btn :to="to" variant="plain" color="light">{{ $t('See all') }}</v-btn>
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
