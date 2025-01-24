<template>
  <div class="player">
    <div class="player-body">
      <ion-button>
        <ion-icon :icon="play" />
      </ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { play } from 'ionicons/icons'
</script>

<style lang="scss" scoped>
.player {
  position: absolute;
  height: auto;
  width: 100%;
  top: 0%;
  left: 50%;
  right: 50%;
  
  .player-body {
    padding: 1rem;
  }
}
</style>
