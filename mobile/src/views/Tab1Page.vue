<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="primary">
          <ion-button fill="clear">
            <ion-icon slot="end" :icon="search" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-nav :root="songExplorer" />
  </ion-page>
</template>

<script setup lang="ts">
import SongExplorer from '@/components/explorer/SongExplorer.vue';
import { IonButton, IonButtons, IonHeader, IonIcon, IonNav, IonPage, IonToolbar } from '@ionic/vue';
import { search } from 'ionicons/icons';
import { markRaw } from 'vue';

const songExplorer = markRaw(SongExplorer)
</script>
