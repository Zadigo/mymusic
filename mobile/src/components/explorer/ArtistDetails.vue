<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-nav-link :component="songDetails" router-direction="back">
          <ion-back-button />
        </ion-nav-link>
      </ion-buttons>
      <ion-title>
        <span v-if="currentlySelected">{{ currentlySelected.artist.name }}</span>
        <span v-else>...</span>
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="art">
      <ion-img v-if="currentlySelected" :src="currentlySelected.album.album_image" :alt="currentlySelected.artist.name" />

      <div class="rank">
        <span class="metric">1</span>
        <span class="label">dans le monde</span>
      </div>
    </div>

    <div class="statistics">
      <h1>7 198 989</h1>
      <p class="ion-no-margin">Nombres de fans par mois</p>
    </div>


    <ion-card class="ion-no-margin ion-margin-top ion-margin-bottom">
      <ion-card-content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio illo veritatis 
        voluptates explicabo, reiciendis totam temporibus molestias iure quis porro sequi deserunt 
        quod ea. Soluta ad sint ex omnis rem.

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, 
        laboriosam! Aliquid error commodi nesciunt ipsa sunt quia doloremque temporibus 
        consequatur corporis? Corrupti, dignissimos officiis quis quaerat iste vero at placeat?
      </ion-card-content>
    </ion-card>

    <ion-card class="ion-no-margin ion-margin-top ion-margin-bottom">
      <ion-card-content>
        <ion-list>
          <ion-item lines="none">
            <ion-icon slot="start" :icon="logoInstagram" />
            <ion-label>Instagram</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-icon slot="start" :icon="logoFacebook" />
            <ion-label>Facebook</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-icon slot="start" :icon="logoTiktok" />
            <ion-label>TikTok</ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script setup lang="ts">
import { useSongs } from '@/stores/songs';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonNavLink, IonTitle, IonToolbar } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { markRaw } from 'vue';

import { logoInstagram, logoFacebook, logoTiktok } from 'ionicons/icons';

import SongDetails from './SongDetails.vue';

const songDetails = markRaw(SongDetails)

const songStore = useSongs()
const { currentlySelected } = storeToRefs(songStore)
</script>

<style lang="css">
h1 {
  font-weight: 900;
  font-size: 2rem;
}

p {
  font-weight: 200;
}

.art {
  position: relative;

  .rank {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 2%;
    right: 5%;
    width: 120px;
    height: 120px;
    text-align: center;
    background-color: black;
    color: white;
    border-radius: 100%;

    span {
      &.metric {
        font-size: 2rem;
        font-weight: 700;
      }
      &.label {
        font-size: .85rem;
      }
    }
  }
}
</style>
