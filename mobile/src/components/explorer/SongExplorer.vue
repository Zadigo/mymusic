<template>  
  <ion-grid class="ion-no-padding">
    <ion-row>
      <ion-col v-for="song in songs" :key="song.id" size="12">
        <song-card :song="song" @show-options="handleSongSelection">
          <template #albumImage>
            <video v-if="song.prefers_video" height="700" autoplay controls>
              <source :src="song.video_source" type="video/mp4">
            </video>

            <ion-img v-else :src="song.album.artist.cover_image" :alt="song.name" @click="songStore.handleShowSongDetails(song)" />
          </template>
        </song-card>
      </ion-col>

      <ion-infinite-scroll @ionInfinite="handleGenerateContent">
        <ion-infinite-scroll-content />
      </ion-infinite-scroll>
    </ion-row>
  </ion-grid>
  <!-- Modals -->
  <song-actions :show="showOptionsModal" @close="showOptionsModal=false" />
</template>

<script setup lang="ts">
import { createSongMockup } from '@/data';
import { useSongs } from '@/stores/songs';
import { Song } from '@/types';
import { IonCol, IonGrid, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, type InfiniteScrollCustomEvent } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';

import SongCard from '@/components/SongCard.vue';
import SongActions from '../modals/SongActions.vue';

const songStore = useSongs()
const { songs, currentlySelected } = storeToRefs(songStore)

const showOptionsModal = ref(false)

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
