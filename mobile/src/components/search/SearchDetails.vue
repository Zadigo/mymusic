<template>
  <!-- <ion-header>
    <ion-toolbar>
      Search details
    </ion-toolbar>
  </ion-header> -->
  <ion-content :fullscreen="true" class="ion-padding">
    <ion-list>
      <ion-item v-for="i in 5" :key="i">
        <ion-nav-link :component="searchResults" router-direction="forward">
          <ion-avatar>
            <img src="/favicon.png" alt="">
          </ion-avatar>
          <span>Google</span>
        </ion-nav-link>
        <ion-icon :icon="close" />
      </ion-item>
    </ion-list>

    <ion-nav-link :component="searchResults" router-direction="forward">
      <ion-button fill="clear">
        Results
      </ion-button>
    </ion-nav-link>
  </ion-content>
</template>

<script setup lang="ts">
import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonList, IonNavLink } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { markRaw } from 'vue';

import SearchResults from '@/components/search/SearchResults.vue';

const searchResults = markRaw(SearchResults)
</script>
