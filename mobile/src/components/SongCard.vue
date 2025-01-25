<template>
  <ion-card>
    <slot name="albumImage">
      <ion-img :src="song.album.album_image" :alt="song.name" />
    </slot>
    
    <ion-card-header>
      <ion-card-title>Song {{ song.id }}</ion-card-title>
      <ion-card-subtitle>{{ song.artist.name }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-range v-model="percentageComplete" />

      <ion-button size="small" color="secondary" shape="round" @click="handlePlay(song)">
        <ion-icon :icon="play" />
      </ion-button>

      <ion-button size="small" color="secondary" shape="round">
        <ion-icon :icon="heartOutline" />
      </ion-button>

      <ion-button size="small" color="secondary" shape="round" @click="emit('show-options', song)">
        <ion-icon :icon="addCircleOutline" />
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { useMediaPlayer } from '@/composables/songs';
import { Song } from '@/types';
import { IonButton, IonCard, IonCardContent, IonRange, IonCardHeader, IonImg, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
import { addCircleOutline, heartOutline, play } from 'ionicons/icons';
import { PropType, ref } from 'vue';

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

const percentageComplete = ref(20)

const { handlePlay } = useMediaPlayer()
</script>
