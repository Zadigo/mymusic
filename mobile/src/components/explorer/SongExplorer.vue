<template>
  <!-- <ion-header>
    <ion-toolbar>
      <ion-title>Song explorer</ion-title>
    </ion-toolbar>
  </ion-header> -->
  <!-- :fullscreen="true" class="ion-padding" -->
  
  <ion-content>
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Song explorer</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-grid>
      <ion-row>
        <ion-col v-for="song in songs" :key="song.id" size="12">
          <song-card :song="song" @show-options="handleSongSelection">
            <template #albumImage>
              <ion-nav-link router-direction="forward" :component="songDetails">
                <ion-img :src="song.album_image" alt="Silhouette of mountains" />
              </ion-nav-link>
            </template>
          </song-card>
        </ion-col>

        <ion-infinite-scroll @ionInfinite="handleGenerateContent">
          <ion-infinite-scroll-content></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ion-row>
    </ion-grid>

    <!-- Modals -->
    <ion-modal :is-open="showOptionsModal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]" @did-dismiss="showOptionsModal=false">
      <ion-header>
        <ion-toolbar>
          <ion-grid>
            <ion-row class="ion-justify-content-start">
              <ion-col size="2">
                <img src="/music1.jpg" width="30" alt="">
              </ion-col>

              <ion-col size="9">
                <div>
                  <p class="ion-no-margin ion-margin-bottom">
                    Song title
                  </p>
                  <p class="ion-no-margin">
                    Mariah Carey, Album title
                  </p>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            Ajouter à une playlist
          </ion-item>
          <ion-item>
            Ajouter à la file d'attente
          </ion-item>
          <ion-item>
            Partager
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>
  </ion-content>  
</template>

<script setup lang="ts">
import SongCard from '@/components/SongCard.vue';
import { randomImages } from '@/data';
import { useSongs } from '@/stores/songs';
import { Song } from '@/types';
import { IonCol, IonContent, IonGrid, IonHeader, IonImg, IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent, IonModal, IonNavLink, IonRow, IonTitle, IonToolbar, type InfiniteScrollCustomEvent } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { markRaw, onBeforeMount, ref } from 'vue';
import SongDetails from './SongDetails.vue';

const showOptionsModal = ref(false)
const selectedSong = ref<Song>()
const songStore = useSongs()
const { songs } = storeToRefs(songStore)

const songDetails = markRaw(SongDetails)

async function requestContent() {
  try {
    songs.value = Array.from({ length: 300 }, (_, i) => {
      const randomIndex = Math.floor(Math.random() * randomImages.length)

      return {
        id: i + 1,
        album_image: randomImages[randomIndex],
        artist: {
          id: i + 1,
          name: `Artist name n° ${i}`
        }
      }
    })
  } catch (e) {
    console.log(e)
  }
}

function handleGenerateContent(e: InfiniteScrollCustomEvent) {
  requestContent()
  setTimeout(() => {
    e.target.complete()
  }, 5000);
}

function handleSongSelection(song: Song) {
  selectedSong.value = song
  showOptionsModal.value = true
}

onBeforeMount(requestContent)
</script>
