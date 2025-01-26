<template>
  <ion-row>
    <ion-col size="12">
      <p class="ion-margin-start">{{ blockTitle }}</p>
      <ion-card class="ion-no-margin ion-margin-top ion-margin-bottom">
        <ion-card-content>
          <ion-list>
            <slot />
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-col>
  </ion-row>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCol, IonList, IonRow } from '@ionic/vue';

defineProps({
  blockTitle: {
    type: String,
    required: true
  }
})
</script>
