<template>
  <ion-menu type="push" content-id="main-content">
    <ion-header>
      <ion-toolbar class="ion-padding">
        <ion-row class="ion-justify-content-start ion-align-items-center">
          <ion-col size="4">
            <ion-avatar>
              <img src="/avatar1.png" alt="">
            </ion-avatar>
          </ion-col>

          <ion-col>
            <h5 class="ion-no-margin">John Pendenque</h5>
            <p class="ion-no-margin">Simple profile</p>
          </ion-col>
        </ion-row>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list :inset="false">
        <ion-item button lines="none" @click="authStore.showQrCodeModal=true">
          <ion-icon slot="start" :icon="qrCode" aria-hidden="true" />
          <ion-label>QR Code</ion-label>
        </ion-item>

        <ion-item button lines="none" @click="authStore.showProfileModal=true">
          <ion-icon slot="start" :icon="settings" aria-hidden="true" />
          <ion-label>Paramètre</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
        <ion-title>
          Explorer
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Feed -->
      <suspense>
        <base-async-feed />

        <template #fallback>
          Loading...
        </template>
      </suspense>

      <!-- Player -->
      <!-- <base-player /> -->

      <!-- Sub Pages -->
      <song-details-modal />
      
      <!-- Modals -->
      <playlist-details />
      <qr-code-details :show="authStore.showQrCodeModal" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useAuthentictation } from '@/stores/authentication';
import { IonAvatar, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import { settings, qrCode } from 'ionicons/icons';
import { defineAsyncComponent } from 'vue';

import PlaylistDetails from '@/components/modals/PlaylistDetails.vue';
import SongDetailsModal from '@/components/modals/SongDetailsModal.vue';
import QrCodeDetails from '@/components/modals/QrCodeDetails.vue'

const authStore = useAuthentictation()

const BaseAsyncFeed = defineAsyncComponent({
  loader: () => import('@/components/explorer/BaseFeed.vue'),
  timeout: 10000
})
</script>
