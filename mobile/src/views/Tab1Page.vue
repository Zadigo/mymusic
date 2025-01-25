<template>
  <ion-menu type="push" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the menu content.</ion-content>
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
      <base-player />
      <song-explorer />
      <!-- Sub Pages -->
      <song-details-modal />
      <!-- Modals -->
      <playlist-details />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import SongDetailsModal from '@/components/explorer/SongDetailsModal.vue';
import SongExplorer from '@/components/explorer/SongExplorer.vue';
import BasePlayer from '@/components/BasePlayer.vue';
import PlaylistDetails from '@/components/modals/PlaylistDetails.vue';
</script>
