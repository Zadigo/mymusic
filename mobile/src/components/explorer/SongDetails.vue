<template>
  <ion-header>
    <ion-toolbar>
      <ion-nav-link :component="songExplorer" router-direction="back">
        <ion-button>
          <ion-icon :icon="arrowBack" />
        </ion-button>
      </ion-nav-link>

      <ion-buttons slot="start">
        <ion-back-button />
      </ion-buttons>
      <ion-title>Song details</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen="true" class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <div class="artist-header">
            <ion-img src="/music1.jpg" alt="" />
          </div>
        </ion-col>
        <ion-col size="12">
          <ion-button color="dark" size="small">
            Follow
          </ion-button>
          <ion-button color="dark" shape="round">
            <ion-icon :icon="shuffle" />
          </ion-button>
          <ion-button color="dark" shape="round">
            <ion-icon :icon="play" />
          </ion-button>
        </ion-col>
        <ion-col size="12">
          <h1 class="ion-margin-bottom">Songs</h1>
          <ion-list>
            <ion-item v-for="i in 5" :key="i">
              <ion-label>
                Song {{ i }}
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
        <ion-col size="12">
          <h1 class="ion-margin-bottom">Songs</h1>
          <ion-card>
            <ion-img src="/music1.jpg" alt="" @click="modalState=true" />

            <p class="artist-details">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium fuga incidunt enim distinctio...
            </p>

            <ion-card-content>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>

    <!-- Modals -->
    <ion-modal :is-open="modalState">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="modalState=false">
              Close
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-img src="/music1.jpg" alt="" />

        <h1>7 198 989</h1>
        <p>Nombres de fans par mois</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio illo veritatis 
          voluptates explicabo, reiciendis totam temporibus molestias iure quis porro sequi deserunt 
          quod ea. Soluta ad sint ex omnis rem.

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, 
          laboriosam! Aliquid error commodi nesciunt ipsa sunt quia doloremque temporibus 
          consequatur corporis? Corrupti, dignissimos officiis quis quaerat iste vero at placeat?
        </p>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonNavLink, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import { play, shuffle } from 'ionicons/icons';
import { markRaw, ref } from 'vue';
import { arrowBack } from 'ionicons/icons'

import SongExplorer from '@/components/explorer/SongExplorer.vue';

const modalState = ref(false)
const songExplorer = markRaw(SongExplorer)
</script>

<style lang="scss">

</style>
