<template>
  <ion-modal :is-open="showSongDetails">
    <ion-content>
      <ion-nav :root="songDetails" />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { useSongs } from '@/stores/songs';
import { IonContent, IonModal, IonNav } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { markRaw } from 'vue';

import SongDetails from '@/components/explorer/SongDetails.vue';

const songDetails = markRaw(SongDetails)

const songStore = useSongs()
const { showSongDetails } = storeToRefs(songStore)
</script>
