<template>
  <ion-header>
    <ion-toolbar>
      <ion-nav-link :component="searchDetails" router-direction="back">
        <ion-button>
          <ion-icon :icon="arrowBack" />
        </ion-button>
      </ion-nav-link>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true" class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col v-for="i in 34" :key="i" size="6">
          <ion-card>
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
import { IonButton, IonCol, IonContent, IonCardContent, IonCard, IonGrid, IonHeader, IonIcon, IonNavLink, IonRow, IonToolbar } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { markRaw } from 'vue';

import SearchDetails from '@/components/search/SearchDetails.vue';

const searchDetails = markRaw(SearchDetails)
</script>
