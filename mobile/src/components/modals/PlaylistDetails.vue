<template>
  <ion-modal :is-open="showPlaylistsModal">
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-button @click="showPlaylistsModal=false">
            Close
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h4>Ajouter à la playlist</h4>

      <ion-button>
        Nouvelle playlist
      </ion-button>

      <ion-input placeholder="Rechercher une playlist" />

      <ion-list>
        <ion-item v-for="i in 10" :key="i" lines="none">
          <img src="/music1.jpg" class="ion-margin-end" height="50" alt="Some alt" />
          <ion-label>
            <p>Playlist name</p>
            <p>15 songs</p>
          </ion-label>
          <ion-checkbox />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { useSongs } from '@/stores/songs';
import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonToolbar } from '@ionic/vue';
import { storeToRefs } from 'pinia';

const songStore = useSongs()
const { showPlaylistsModal } = storeToRefs(songStore) 
</script>
