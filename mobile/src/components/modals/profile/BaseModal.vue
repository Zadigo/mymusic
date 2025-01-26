<template>
  <ion-modal :is-open="authStore.showProfileModal">
    <ion-content>
      <ion-nav :root="homeComponent" />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonContent, IonModal, IonNav } from '@ionic/vue';

import HomeComponent from './HomeComponent.vue';
import { markRaw } from 'vue';
import { useAuthentictation } from '@/stores/authentication';

const homeComponent = markRaw(HomeComponent)

const authStore = useAuthentictation()
</script>
