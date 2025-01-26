<template>
  <profile-base-block block-title="Connexion">
    <template #default>
      <ion-item button lines="none">
        <ion-icon slot="start" :icon="logOut" aria-hidden="true" />
        <ion-label>Se déconnecter</ion-label>
      </ion-item>
    </template>
  </profile-base-block>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel } from '@ionic/vue';
import { logOut } from 'ionicons/icons';

import ProfileBaseBlock from './BaseBlock.vue';
</script>
