<template>
  <div class="player bg-dark border-top">
    <div class="row">
      <div id="controls" class="col-12 text-center">
        <b-btn class="m-2" @click="toggleShuffle"><font-awesome-icon icon="random" /></b-btn>
        <b-btn class="m-2" @click="previousSong"><font-awesome-icon icon="step-backward" /></b-btn>

        <b-btn v-if="isPlaying" class="m-2" @click="pause">
          <font-awesome-icon icon="pause" />
        </b-btn>
        <b-btn v-else class="m-2" @click="play">
          <font-awesome-icon icon="play" />
        </b-btn>
        
        <b-btn class="m-2" @click="nextSong"><font-awesome-icon icon="step-forward" /></b-btn>
        <b-btn class="m-2" @click="toggleRepeat"><font-awesome-icon icon="redo-alt" /></b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'MiniPlayer',
  computed: {
    ...mapState('playerModule', [
      'isPlaying', 'shuffleActivated', 'repeatActivated'
    ])
  },
  methods: {
    ...mapMutations({
      play: 'playerModule/play',
      pause: 'playerModule/pause',
      nextSong: 'playerModule/nextSong',
      previousSong: 'playerModule/previousSong',
      toggleShuffle: 'playerModule/toggleShuffle',
      toggleRepeat: 'playerModule/toggleRepeat',
    })
  }
}
</script>

<style>
  .player {
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
  }
</style>
