<template>
  <profile-base-block block-title="Compte">
    <template #default>
      <ion-item button lines="none">
        <ion-icon slot="start" :icon="personOutline" aria-hidden="true" />
        <ion-label>Compte</ion-label>
      </ion-item>

      <ion-item button lines="none">
        <ion-icon slot="start" :icon="lockClosed" aria-hidden="true" />
        <ion-label>Confidentialité</ion-label>
      </ion-item>

      <ion-item button lines="none">
        <ion-icon slot="start" :icon="statsChart" aria-hidden="true" />
        <ion-label>Données analytiques</ion-label>
      </ion-item>
    </template>
  </profile-base-block>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel } from '@ionic/vue';
import { lockClosed, personOutline, statsChart } from 'ionicons/icons';

import ProfileBaseBlock from './BaseBlock.vue';
</script>
