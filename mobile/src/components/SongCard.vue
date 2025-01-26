<template>
  <ion-card class="ion-no-margin ion-margin-bottom">
    <slot name="albumImage">
      <ion-img :src="song.album.cover_image" :alt="song.name" />
    </slot>

    <div class="artist-art">
      <div class="art">
        <ion-avatar>
          <img :src="song.album.artist.cover_image" :alt="song.album.artist.fullname">
        </ion-avatar>
      </div>
    </div>
    
    <ion-card-header>
      <ion-card-title>{{ song.name }}</ion-card-title>
      <ion-card-subtitle>{{ song.album.artist.name }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-range v-model="songActualTime" :max="songDuration" :step="0.01" @ion-change="handleProgressChange" />

      <ion-button v-if="isPlaying" size="small" color="secondary" shape="round" @click="handlePause">
        <ion-icon :icon="pause" />
      </ion-button>
      <ion-button v-else size="small" color="secondary" shape="round" @click="handlePlay">
        <ion-icon :icon="play" />
      </ion-button>

      <ion-button size="small" color="secondary" shape="round" @click="handleLikeSong">
        <ion-icon :icon="heartOutline" />
      </ion-button>

      <ion-button size="small" color="secondary" shape="round" @click="emit('show-options', song)">
        <ion-icon :icon="addCircleOutline" />
      </ion-button>
    </ion-card-content>

    <audio ref="audioPlayerEl" @loadedmetadata="handleMetadata">
      <source src="/music1.mp3" type="audio/mpeg">
    </audio>
  </ion-card>
</template>

<script setup lang="ts">
import { useMediaPlayer } from '@/composables/songs';
import { Song } from '@/types';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonRange } from '@ionic/vue';
import { addCircleOutline, heartOutline, play, pause } from 'ionicons/icons';
import { PropType } from 'vue';

const emit = defineEmits({
  'show-options' (_song: Song) {
    return true
  } 
})

defineProps({
  song: {
    type: Object as PropType<Song>,
    required: true
  }
})

const { audioPlayerEl, songActualTime, songDuration, isPlaying, handleProgressChange, handlePlay, handlePause, handleMetadata } = useMediaPlayer()

// Add this song to the user's playlist
// of music that he liked
async function handleLikeSong() {}
</script>

<style lang="scss">
.artist-art {
  position: absolute;
  right: 5%;
  bottom: 45%;
  border: 2px solid white;
  border-radius: 100%;
}
</style>
