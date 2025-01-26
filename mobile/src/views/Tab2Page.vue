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
            <ion-button color="secondary" @click="openSearchModal=true">
              <ion-icon slot="start" :icon="search" />
              What do you want to search?
            </ion-button>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12">
            <h1>Genres musicaux</h1>
          </ion-col>

          <ion-col v-for="i in 30" :key="i" size="6">
            <ion-card class="ion-no-margin">
              <ion-nav-link :component="genreDetails" router-direction="forward">
                <ion-img src="/album4.jpg" alt="" />
              </ion-nav-link>
              
              <h3 class="title-genre">Rhythm and blues</h3>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
      
      <!-- Modals -->
      <ion-modal :is-open="openSearchModal">
        <ion-content>
          <ion-nav :root="searchDetails" @close="openSearchModal=false" />
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonModal, IonNav, IonNavLink, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import { search } from 'ionicons/icons';
import { markRaw, ref } from 'vue';

import GenreDetails from '@/components/search/GenreDetails.vue';
import SearchDetails from '@/components/search/SearchDetails.vue';

const openSearchModal = ref(false)

const genreDetails = markRaw(GenreDetails)
const searchDetails = markRaw(SearchDetails)
</script>

<style lang="scss" scoped>
.title-genre {
  position: absolute;
  bottom: 1%;
  left: 1%;
  padding: .25rem;
  color: white;
}
</style>
