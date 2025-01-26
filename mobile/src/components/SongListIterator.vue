<template>
  <ion-list>
    <ion-item v-for="song in songs" :key="song.id" class="ion-margin-bottom" lines="none">
      <img v-if="currentlySelected" :src="currentlySelected.album.cover_image" :alt="song.name" class="ion-margin-end" height="50" @click="emit('play-song', song)" />
      <ion-label>
        <p>{{ song.name }}</p>
        <p>1 245 344</p>
      </ion-label>

      <ion-button fill="clear" @click="emit('song-actions')">
        <ion-icon :icon="ellipsisVertical" />
      </ion-button>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { useSongs } from '@/stores/songs';
import { AlbumSong } from '@/types';
import { IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue';
import { ellipsisVertical } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { PropType } from 'vue';

defineProps({
  songs: {
    type: Object as PropType<AlbumSong[]>
  }
})

const emit = defineEmits({
  'song-actions'() {
    return true
  },
  'play-song'(_song: AlbumSong) {
    return true
  }
})

const songStore = useSongs()
const { currentlySelected } = storeToRefs(songStore)
</script>
