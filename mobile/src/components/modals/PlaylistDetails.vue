<template>
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
      <ion-grid>
        <ion-row>
          <ion-col size="12" class="ion-text-center">
            <h4>Ajouter à la playlist</h4>
          </ion-col>

          <ion-col size="12" class="ion-text-center">
            <ion-button shape="round" @click="handleCreatePlaylist">
              Nouvelle playlist
            </ion-button>      
          </ion-col>

          <ion-col size="12" class="ion-text-center">
            <ion-input v-model="search" placeholder="Rechercher une playlist" />
          </ion-col>

          <ion-col size="12" class="ion-text-center">
            <ion-list>
              <ion-item v-for="playlist in searchedPlaylists" :key="playlist.id" lines="none">
                <img :src="playlist.cover_image" class="ion-margin-end" height="50" alt="Some alt" />
                <ion-label>
                  <p>{{ playlist.name }}</p>
                  <p>{{ playlist.songs.length }} songs</p>
                </ion-label>
                <ion-checkbox />
              </ion-item>
            </ion-list>          
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { createMockupPlaylists } from '@/data';
import { useSongs } from '@/stores/songs';
import { UserPlaylist } from '@/types';
import { IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonRow, IonToolbar } from '@ionic/vue';
// import { useRefHistory } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';

const songStore = useSongs()
const { showPlaylistsModal } = storeToRefs(songStore) 

const search = ref<string>('')
const playlists = ref<UserPlaylist[]>([])

// const { history } = useRefHistory(search)

// console.log(history)

const searchedPlaylists = computed(() => {
  if (search.value) {
    return playlists.value.filter(x => {
      return (
        x.name.toLowerCase() === search.value ||
        x.name.toLowerCase().includes(search.value)
      )
    })
  } else {
    return playlists.value
  }
})

async function requestPlaylists() {
  try {
    playlists.value = createMockupPlaylists()
  } catch (e) {
    console.error(e)
  }
}

async function handleCreatePlaylist() {

}

onMounted(requestPlaylists)
</script>
