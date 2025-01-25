<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Search</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-button @click="openSearchModal=true">
              What do you want to search?
            </ion-button>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12">
            <h1>Genres musicaux</h1>
          </ion-col>

          <ion-col v-for="i in 30" :key="i" size="6">
            <ion-card>
              <ion-card-content>
                Genre 1
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      
      <!-- Modals -->
      <ion-modal :is-open="openSearchModal">
        <ion-header>
          <ion-toolbar>
            <ion-button @click="openSearchModal=false">
              <ion-icon :icon="arrowBack" />
            </ion-button>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-nav :root="searchDetails" />
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonModal, IonNav, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { markRaw, ref } from 'vue';

import SearchDetails from '@/components/search/SearchDetails.vue';

const openSearchModal = ref(false)
const searchDetails = markRaw(SearchDetails)
</script>
