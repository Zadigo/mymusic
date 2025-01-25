<template>  
  <ion-grid class="ion-no-padding">
    <ion-row>
      <ion-col v-for="song in songs" :key="song.id" size="12">
        <song-card :song="song" @show-options="handleSongSelection">
          <template #albumImage>
            <video v-if="song.prefers_video" height="700" autoplay controls>
              <source :src="song.video_source" type="video/mp4">
            </video>

            <ion-img v-else :src="song.album.album_image" :alt="song.name" @click="songStore.handleShowSongDetails(song)" />
          </template>
        </song-card>
      </ion-col>

      <ion-infinite-scroll @ionInfinite="handleGenerateContent">
        <ion-infinite-scroll-content />
      </ion-infinite-scroll>
    </ion-row>
  </ion-grid>
  <!-- Song Actions -->
  <ion-modal :is-open="showOptionsModal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75]" @did-dismiss="showOptionsModal=false">
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row class="ion-justify-content-start">
            <ion-col size="2">
              <img v-if="currentlySelected" :src="currentlySelected.album.album_image" :alt="currentlySelected.name" width="30">
            </ion-col>

            <ion-col size="9">
              <div v-if="currentlySelected" class="song-details">
                <p class="ion-no-margin ion-margin-bottom">
                  {{ currentlySelected.name }}
                </p>
                <p class="ion-no-margin">
                  {{ currentlySelected.artist.name }}, {{ currentlySelected.album.name }}
                </p>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item :button="true" lines="none" @click="showPlaylistsModal=true">
          <ion-icon slot="start" :icon="addCircle" aria-hidden="true" />
          <ion-label>Ajouter à une playlist</ion-label>
        </ion-item>

        <ion-item :button="true" lines="none">
          <ion-icon slot="start" :icon="listOutline" aria-hidden="true" />
          <ion-label>Ajouter à la file d'attente</ion-label>
        </ion-item>
        
        <ion-item :button="true" lines="none">
          <ion-icon slot="start" :icon="shareSocialOutline" aria-hidden="true" />
          <ion-label>Partager</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
  <!-- Playlists -->
  <ion-modal :is-open="showPlaylistsModal">
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-button @click="showPlaylistsModal=false">
            Close
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h4>Ajouter à la playlist</h4>

      <ion-button>
        Nouvelle playlist
      </ion-button>

      <ion-input placeholder="Rechercher une playlist" />

      <ion-list>
        <ion-item v-for="i in 10" :key="i" lines="none">
          <img src="/music1.jpg" class="ion-margin-end" height="50" alt="Some alt" />
          <ion-label>
            <p>Playlist name</p>
            <p>15 songs</p>
          </ion-label>
          <ion-checkbox />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { createSongMockup } from '@/data';
import { useSongs } from '@/stores/songs';
import { Song } from '@/types';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonButtons, IonCheckbox, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonModal, IonRow, IonToolbar, type InfiniteScrollCustomEvent } from '@ionic/vue';
import { addCircle, listOutline, shareSocialOutline } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';

import SongCard from '@/components/SongCard.vue';

const songStore = useSongs()
const { songs, currentlySelected } = storeToRefs(songStore)

const showOptionsModal = ref(false)
const showPlaylistsModal = ref(false)

async function requestContent() {
  try {
    songs.value = createSongMockup()
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
  currentlySelected.value = song
  showOptionsModal.value = true
}

onBeforeMount(requestContent)
</script>
