<template>
  <ion-list>
    <ion-item v-for="i in 4" :key="i" class="ion-margin-bottom" lines="none">
      <img src="/music1.jpg" class="ion-margin-end" height="50" alt="Some alt" />
      <ion-label>
        <p>Song name</p>
        <p>1 245 344</p>
      </ion-label>
      <ion-button fill="clear" @click="emit('song-actions')">
        <ion-icon :icon="ellipsisVertical" />
      </ion-button>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonButton, IonIcon } from '@ionic/vue';
import { ellipsisVertical } from 'ionicons/icons'

const emit = defineEmits({
  'song-actions'() {
    return true
  }
})
</script>
