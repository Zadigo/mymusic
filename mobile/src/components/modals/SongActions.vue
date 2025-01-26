<template>
  <ion-modal :is-open="showOptionsModal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 0.75]" @did-dismiss="emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row class="ion-justify-content-start">
            <ion-col size="2">
              <img v-if="currentlySelected" :src="currentlySelected.album.cover_image" :alt="currentlySelected.name" width="100">
            </ion-col>

            <ion-col size="9" class="song-details">
              <div v-if="currentlySelected">
                <p class="ion-no-margin">
                  {{ currentlySelected.name }}
                </p>
                
                <p class="ion-no-margin">
                  {{ currentlySelected.album.artist.name }}, {{ currentlySelected.album.name }}
                </p>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item :button="true" lines="none" @click="handleAddToPlaylist">
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
</template>

<script setup lang="ts">
import { useSongs } from '@/stores/songs';
import { IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonRow, IonToolbar } from '@ionic/vue';
import { addCircle, listOutline, shareSocialOutline } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const songStore = useSongs()
const { currentlySelected, showPlaylistsModal } = storeToRefs(songStore)

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits({
  'modelValue'(_value: boolean) {
    return true
  },
  'close'() {
    return true
  },
  // 'playlist-modal'() {
  //   return true
  // }
})

const showOptionsModal = computed({
  get: () => props.show,
  set: (value) => {
    emit('modelValue', value)
  }
})

function handleAddToPlaylist() {
  showOptionsModal.value = false
  showPlaylistsModal.value = true
}
</script>

<style lang="scss" scoped>
.song-details {
  margin-top: 2rem;
}
</style>
