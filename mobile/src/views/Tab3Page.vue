<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">What friends listen to</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Feed -->
      <suspense>
        <async-base-feed />

        <template #fallback>
          Loading...
        </template>
      </suspense>

      <!-- Song Details -->
      <song-details-modal />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { defineAsyncComponent } from 'vue';

import SongDetailsModal from '@/components/modals/SongDetailsModal.vue';

const AsyncBaseFeed = defineAsyncComponent({
  loader: () => import('@/components/explorer/BaseFeed.vue'),
  timeout: 10000
})
</script>
