<template>
  <div class="player">
    <div class="player-body ion-text-center">
      {{ formattedActualTime }} - {{ formattedDuration }} - {{ percentageCompleted }}%
      <ion-range v-model="songActualTime" :max="songDuration" :step="0.01" @ion-change="handleProgressChange" />

      <ion-button v-if="isPlaying" size="small" shape="round" color="secondary" @click="handlePause">
        <ion-icon :icon="pause" />
      </ion-button>

      <ion-button v-else size="small" shape="round" color="secondary" @click="handlePlay">
        <ion-icon :icon="play" />
      </ion-button>

      <ion-button size="small" shape="round" color="secondary">
        <ion-icon :icon="playSkipBack" />
      </ion-button>

      <ion-button size="small" shape="round" color="secondary">
        <ion-icon :icon="playSkipForward" />
      </ion-button>
    </div>

    <audio ref="audioPlayer" @loadedmetadata="handleMetadata">
      <source src="/music1.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonRange } from '@ionic/vue';
import { pause, play, playSkipBack, playSkipForward } from 'ionicons/icons';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const isPlaying = ref(false)
// Indicates that the user has played the
// song for the first time
const firstPlay = ref(false)
// Flag that catches when the user has
// skipped certain parts of the song
const isSkipped = ref(false)
const audioPlayer = ref<HTMLAudioElement>()
const songDuration = ref(0)
const songActualTime = ref(0)

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function handleMetadata(e: Event) {
  const audio = e.target as HTMLAudioElement
  songDuration.value = audio.duration
}

function handleProgress() {
  if (audioPlayer.value) {
    songActualTime.value =  audioPlayer.value.currentTime
  }
}

function handlePlay() {
  if (audioPlayer.value) {
    if (songActualTime.value === 0 && !firstPlay.value) {
      firstPlay.value = true
    }

    isPlaying.value = true
    audioPlayer.value.play()
  }
}

function handlePause() {
  if (audioPlayer.value) {
    isPlaying.value = false
    audioPlayer.value.pause()
  }
}

function handleProgressChange() {
  if (audioPlayer.value) {
    if (songActualTime.value > 0 && firstPlay.value) {
      isSkipped.value = true
    }
    audioPlayer.value.currentTime = songActualTime.value
  }
}

const formattedDuration = computed(() => formatTime(songDuration.value));
const formattedActualTime = computed(() => formatTime(songActualTime.value));

// Computed property for percentage completed
const percentageCompleted = computed(() => {
  if (songDuration.value === 0) {
    return 0
  } else {
    return ((songActualTime.value / songDuration.value) * 100).toFixed(0);
  }
})

onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.addEventListener('timeupdate', handleProgress)
  }
})

onUnmounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.removeEventListener('timeupdate', handleProgress)
  }
})

defineExpose({
  handlePlay,
  handlePause,
  handleProgressChange
})
</script>

<style lang="scss" scoped>
$padding_top_bottom: 1rem;
$padding_left_right: 4rem;

.player {
  position: fixed;
  height: auto;
  width: 400px;
  bottom: 2%;
  margin: 0 auto;
  padding: .25rem;
  border-radius: .25rem;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1001;
  
  .player-body {
    padding-top: $padding_top_bottom;
    padding-bottom: $padding_top_bottom;
    padding-left: $padding_left_right;
    padding-right: $padding_left_right;
  }
}
</style>
