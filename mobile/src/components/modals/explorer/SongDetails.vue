<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button shape="round" size="small" @click="showSongDetails=false">
          <ion-icon :icon="arrowBack" />
        </ion-button>
      </ion-buttons>
      
      <ion-title>
        <span v-if="currentlySelected">{{ currentlySelected.name }}</span>
        <span v-else>...</span>
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-grid class="ion-no-padding">
      <ion-row>
        <ion-col size="12">
          <div v-if="currentlySelected" class="artist-header">
            <ion-img :src="currentlySelected.album.cover_image" :alt="currentlySelected.album.artist.name" />
            <div class="dark-screen" />
            <div class="artist-infos">
              <h1>{{ currentlySelected.album.artist.name }}</h1>
            </div>
          </div>
        </ion-col>

        <!-- Actions -->
        <ion-col class="ion-padding" size="12">
          <ion-row class="ion-justify-content-between ion-align-items-center">
            <ion-col v-if="currentlySelected">
              <ion-button v-if="currentlySelected.album.artist.is_following" color="secondary" shape="round">
                Unfollow
              </ion-button>
              <ion-button v-else color="secondary" shape="round">
                Follow
              </ion-button>
            </ion-col>

            <ion-col class="ion-text-end">
              <ion-button color="dark" shape="round" @click="handleShuffleAlbumSongs">
                <ion-icon :icon="shuffle" />
              </ion-button>
              
              <ion-button v-if="isPlaying" color="dark" shape="round" @click="handlePause">
                <ion-icon :icon="pause" />
              </ion-button>

              <ion-button v-else color="dark" shape="round" @click="handlePlayAlbumSongs">
                <ion-icon :icon="play" />
              </ion-button>

              <audio ref="audioPlayerEl" @loadedmetadata="handleMetadata">
                <source src="/music1.mp3" type="audio/mpeg">
              </audio>
            </ion-col>
          </ion-row>
        </ion-col>
        
        <!-- Albums -->
        <ion-col class="ion-padding-start ion-padding-end" size="12">
          <h4 class="ion-margin-bottom">Albums</h4>
          <ion-list>
            <ion-item lines="full">
              Album n°2
            </ion-item>
          </ion-list>
        </ion-col>

        <!-- Popular Songs -->
        <ion-col class="ion-padding-start ion-padding-end ion-margin-top ion-margin-bottom" size="12">
          <h4 class="ion-margin-bottom">Other songs</h4>
          <song-list-iterator :songs="albumSongs" @song-actions="showSongActions=true" @play-song="handlePlayAlbumSong" />
          <song-actions :show="showSongActions" @close="showSongActions=false" />
        </ion-col>
        
        <!-- Artist -->
        <ion-col v-if="currentlySelected" class="ion-padding-start ion-padding-end" size="12">
          <h4 class="ion-margin-bottom">
            A propos
          </h4>

          <ion-card class="artist-details ion-no-margin ion-margin-top ion-margin-bottom">
            <ion-nav-link v-if="currentlySelected" :component="artistDetails" router-direction="forward">
              <ion-img :src="currentlySelected.album.artist.cover_image" :alt="currentlySelected.album.artist.name" />
            </ion-nav-link>
            <!-- <div class="dark-screen" /> -->
            <p class="description">
              {{ currentlySelected.album.artist.presentation }}
            </p>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script setup lang="ts">
import { createAlbumSongs } from '@/data';
import { useSongs } from '@/stores/songs';
import { AlbumSong } from '@/types';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonList, IonNavLink, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import { arrowBack, pause, play, shuffle } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { markRaw, onBeforeMount, ref } from 'vue';
import { useMediaPlayer } from '@/composables/songs';

import ArtistDetails from '@/components/modals/explorer/ArtistDetails.vue';
import SongActions from '@/components/modals/SongActions.vue';
import SongListIterator from '@/components/SongListIterator.vue';

const songStore = useSongs()
const { showSongDetails, currentlySelected } = storeToRefs(songStore)

const { handlePlay, handlePause, audioPlayerEl, queue, isPlaying, handleMetadata } = useMediaPlayer()

const artistDetails = markRaw(ArtistDetails)
const albumSongs = ref<AlbumSong[]>([])
const showSongActions = ref(false)

// Returns all the songs within the
// the current given album
async function requestAlbumSongs() {
  try {
    albumSongs.value = createAlbumSongs()
  } catch (e) {
    console.error(e)
  }
}

function setNewSong(song: AlbumSong) {
  if (audioPlayerEl.value) {
    audioPlayerEl.value.src = song.song_file
    audioPlayerEl.value.currentTime = 0
  }
}

// Action when then user selects a song from the lists
// to be played (most popular, album songs...)
function handlePlayAlbumSong(song: AlbumSong) {
  setNewSong(song)
  handlePlay()
}

// Adds the songs of the current
// album into the queue
function handlePlayAlbumSongs() {
  queue.value = []
  queue.value = albumSongs.value

  if (isPlaying.value) {
    // Do Something
  } else {
    // Do something
  }
  
  isPlaying.value = !isPlaying.value
}

// Shuffles through the album songs
function handleShuffleAlbumSongs() {
  // TODO: Shuffle logic
  isPlaying.value = true
}

onBeforeMount(requestAlbumSongs)
</script>

<style lang="scss">
%relative_object {
  position: relative;
}

.dark-screen {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .2);
}

.artist-header {
  @extend %relative_object;

  .artist-infos {
    position: absolute;
    color: white;
    padding: 1rem;
    bottom: 0;
    left: 0;

    h1 {
      text-align: center;
      text-transform: uppercase;
      font-size: 2.5rem;
      font-weight: 900;
    }
  }
}

h4 {
  font-size: 1.8rem;
  font-weight: 700;
}

.artist-details {
  @extend %relative_object;

  .description {
    position: absolute;
    padding: 1rem;
    left: 0;
    text-align: left;
    bottom: 1%;
    color: white;
    font-size: 1.2rem;
  }
}
</style>
