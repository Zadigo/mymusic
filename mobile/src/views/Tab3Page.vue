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

      <song-explorer />
      <song-details-modal />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import SongExplorer from '@/components/explorer/SongExplorer.vue';
import SongDetailsModal from '@/components/explorer/SongDetailsModal.vue';
</script>
