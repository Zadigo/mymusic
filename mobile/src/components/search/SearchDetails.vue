<template>
  <ion-content :fullscreen="true" class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-button @click="emit('close')">
            <ion-icon :icon="close" />
          </ion-button>

          <ion-input placeholder="Search songs" />
        </ion-col>
        <ion-col size="12">
          <ion-list>
            <ion-item v-for="i in 5" :key="i" lines="none">
              <ion-nav-link :component="searchResults" router-direction="forward">
                <ion-avatar slot="start">
                  <img src="/album1.jpg" alt="">
                </ion-avatar>
              </ion-nav-link>

              <ion-label>
                <p class="ion-no-margin">The name of the song</p>
                <p class="ion-no-margin">Artist name</p>
                <!-- <ion-nav-link :component="searchResults" router-direction="forward">
                </ion-nav-link> -->
              </ion-label>

              <ion-button fill="clear">
                <ion-icon :icon="close" />
              </ion-button>
            </ion-item>
          </ion-list>      
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-nav-link :component="searchResults" router-direction="forward">
      <ion-button fill="clear">
        Results
      </ion-button>
    </ion-nav-link>
  </ion-content>
</template>

<script setup lang="ts">
import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNavLink, IonRow } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { markRaw } from 'vue';

import SearchResults from '@/components/search/SearchResults.vue';

const searchResults = markRaw(SearchResults)

const emit = defineEmits({
  close() {
    return true
  }
})
</script>
