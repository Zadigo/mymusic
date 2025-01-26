<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="authStore.showProfileModal=false">
          <ion-icon :icon="arrowBack" />
        </ion-button>
      </ion-buttons>

      Something
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-grid>
      <account-block />
      <connection-block />
    </ion-grid>
  </ion-content>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonGrid, IonIcon, IonHeader, IonToolbar } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons'

import AccountBlock from './AccountBlock.vue';
import ConnectionBlock from './ConnectionBlock.vue';

import { useAuthentictation } from '@/stores/authentication';

const authStore = useAuthentictation()
</script>
