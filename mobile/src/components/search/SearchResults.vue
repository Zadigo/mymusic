<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons>
        <ion-nav-link :component="searchDetails" router-direction="back">
          <ion-button>
            <ion-icon :icon="arrowBack" />
          </ion-button>
        </ion-nav-link>
      </ion-buttons>
      <ion-input placeholder="Search songs" />
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col v-for="i in 34" :key="i" size="6">
          <ion-card class="ion-no-margin">
            <img src="/album1.jpg" alt="">
            <ion-card-content>
              Search Result
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonNavLink, IonRow, IonToolbar } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { markRaw } from 'vue';

import SearchDetails from './SearchDetails.vue';

const searchDetails = markRaw(SearchDetails)
</script>
