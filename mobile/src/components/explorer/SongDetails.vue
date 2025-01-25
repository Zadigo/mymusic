<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button shape="round" size="small" @click="showSongDetails=false">
          <ion-icon :icon="arrowBack" />
        </ion-button>
      </ion-buttons>
      
      <ion-title>
        <span v-if="currentlySelected">{{ currentlySelected.name }}</span>
        <span v-else>...</span>
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-grid class="ion-no-padding">
      <ion-row>
        <ion-col size="12">
          <div v-if="currentlySelected" class="artist-header">
            <ion-img :src="currentlySelected.album.album_image" :alt="currentlySelected.artist.name" />
            <div class="dark-screen" />
            <div class="artist-infos">
              <h1>Britney Spears</h1>
            </div>
          </div>
        </ion-col>
        <ion-col class="ion-padding" size="12">
          <ion-row class="ion-justify-content-between ion-align-items-center">
            <ion-col>
              <ion-button color="secondary" shape="round">
                Follow
              </ion-button>
            </ion-col>

            <ion-col class="ion-text-end">
              <ion-button color="dark" shape="round">
                <ion-icon :icon="shuffle" />
              </ion-button>
              
              <ion-button color="dark" shape="round">
                <ion-icon :icon="play" />
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-col>
        <!-- Albums -->
        <ion-col class="ion-padding-start ion-padding-end" size="12">
          <h4 class="ion-margin-bottom">Albums</h4>
          <ion-list>
            <ion-item lines="full">
              Album n°2
            </ion-item>
          </ion-list>
        </ion-col>
        <!-- Popular Songs -->
        <ion-col class="ion-padding-start ion-padding-end ion-margin-top ion-margin-bottom" size="12">
          <h4 class="ion-margin-bottom">Other songs</h4>
          <song-list-iterator @song-actions="showSongActions=true" />
          <song-actions :show="showSongActions" @close="showSongActions=false" />
        </ion-col>
        <!-- Artist -->
        <ion-col v-if="currentlySelected" class="ion-padding-start ion-padding-end" size="12">
          <h4 class="ion-margin-bottom">
            A propos
          </h4>

          <ion-card class="artist-details ion-no-margin ion-margin-top ion-margin-bottom">
            <ion-nav-link v-if="currentlySelected" :component="artistDetails" router-direction="forward">
              <ion-img :src="currentlySelected.album.album_image" :alt="currentlySelected.artist.name" />
            </ion-nav-link>
            <!-- <div class="dark-screen" /> -->
            <p class="description">
              {{ currentlySelected.artist.description }}
            </p>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script setup lang="ts">
import { useSongs } from '@/stores/songs';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonList, IonNavLink, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import { arrowBack, play, shuffle } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { markRaw, ref } from 'vue';

import ArtistDetails from '@/components/explorer/ArtistDetails.vue';
import SongActions from '../modals/SongActions.vue';
import SongListIterator from '../SongListIterator.vue';

const songStore = useSongs()
const { showSongDetails, currentlySelected } = storeToRefs(songStore)

const artistDetails = markRaw(ArtistDetails)

const showSongActions = ref(false)
</script>

<style lang="scss">
%relative_object {
  position: relative;
}

.dark-screen {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .2);
}

.artist-header {
  @extend %relative_object;

  .artist-infos {
    position: absolute;
    color: white;
    padding: 1rem;
    bottom: 0;
    left: 0;

    h1 {
      text-align: center;
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 900;
    }
  }
}

h4 {
  font-size: 1.8rem;
  font-weight: 700;
}

.artist-details {
  @extend %relative_object;

  .description {
    position: absolute;
    padding: 1rem;
    left: 0;
    text-align: left;
    bottom: 1%;
    color: white;
    font-size: 1.2rem;
  }
}
</style>
