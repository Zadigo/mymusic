<template>
  <div class="card">
    <div class="card-body position-relative">
      <audio ref="link" preload="auto" @loadedmetadata="updateAudioDetails" @timeupdate="updateAudioDetails"
        @waiting="showSpinner = true" @canplay="showSpinner = false">
        <!-- <source :src="require('../assets/music1.wav')" type="audio/mpeg"> -->
        <source :src="src" type="audio/mpeg">
      </audio>

      <div class="audio-controls">
        <div class="progress-bar-container">
          <div ref="progress" class="progress-bar" @click.prevent.stop="handleProgressBarClick">
            <div :style="{ width: progressPercentage + '%' }" class="progress-bar-completed">
              <div :style="{ left: progressPercentage + '%' }" class="progress-indicator" draggable
                @mousedown="handleDrag">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 mt-3 d-flex justify-content-between">
          <span>{{ formattedCurrentTime }}</span>
          <span>{{ formattedDuration }}</span>
        </div>
      </div>
    </div>

    <div class="card-footer text-center">
      <button class="btn btn-primary mx-2" @click="handleSkipPrevious">
        <span class="mdi mdi-skip-previous"></span>
      </button>

      <button class="btn btn-primary mx-2" @click="toggleAudioPlay">
        <span v-if="isPlaying" class="mdi mdi-pause"></span>
        <span v-else class="mdi mdi-play"></span>
      </button>

      <button class="btn btn-primary mx-2" @click="handleSkipNext">
        <span class="mdi mdi-skip-next"></span>
      </button>

      <button class="btn btn-info">
        <!-- <span class="mdi mdi-volume-high"></span> -->
        <!-- <span class="mdi mdi-volume-low"></span> -->
        <span class="mdi mdi-volume-medium"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseMusicPlayer',
  emits: ['player-ready', 'playing', 'paused', 'skipped-backwards', 'skipped', 'next-song'],
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data: () => ({
    showSpinner: true,
    duration: 0,
    currentTime: 0,
    isPlaying: false
  }),
  // mounted() {
  //   this.getAudioDetails()
  // },
  watch: {
    src(current, previous) {
      if (current !== previous) {
        this.$refs.link.src = current
        this.updateAudioDetails()
      }
    }
  },
  computed: {
    formattedDuration() {
      return this.formatTime(this.duration)
    },
    formattedCurrentTime() {
      return this.formatTime(this.currentTime)
    },
    progressPercentage() {
      return (this.currentTime / this.duration) * 100;
    }
  },
  methods: {
    toggleAudioPlay() {
      try {
        if (this.$refs.link.paused) {
          this.isPlaying = true
          this.$refs.link.play()
          this.$emit('playing')
        } else {
          this.isPlaying = false
          this.$refs.link.pause()
          this.$emit('paused', this.currentTime)
        }
      } catch(error) {
        console.error(error)
      }
    },
    updateAudioDetails() {
      try {
        this.duration = this.$refs.link.duration
        this.currentTime = this.$refs.link.currentTime

        if (this.$refs.link.paused) {
          this.isPlaying = false
          this.$refs.link.pause()
        } else {
          this.isPlaying = true
          this.$refs.link.play()
        }
      } catch(error) {
        console.log(error)
      }
    },
    handleSkipPrevious() {
      try {
        this.$emit('skipped-backwards', this.formattedCurrentTime)
        this.$refs.link.currentTime = 0
      } catch(error) {
        console.error(error)
      }
    },
    handleSkipNext() {
      // Get the next song
      this.$emit('next-song')
    },
    handleProgressBarClick(e) {
      var previousTime = this.currentTime
      const currentTime = (this.duration * e.offsetX) / this.$refs.progress.offsetWidth

      this.currentTime = currentTime
      this.$refs.link.currentTime = currentTime
      this.$emit('skipped', [previousTime, this.currentTime])
    },
    handleDrag(e) {
      if (e.x !== 0 && e.y !== 0) {
        var track = this.$refs.progress
        if (track) {
          var drag = 0
          var left = e.pageX - track.getBoundingClientRect().left
          drag = left

          if (left < 0) {
            drag = 0
          }

          if (left > track.offsetWidth) {
            drag = track.offsetWidth
          }

          console.log(this.duration * (drag / track.offsetWidth))
        }
      }
    },
    formatTime(value) {
      var hours = Math.floor(value / 3600)
      var minutes = Math.floor((value % 3600 / 60))
      var seconds = Math.floor(value % 60)

      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      if (hours > 0) {
        // pass
        return ':'
      } else {
        return `${minutes}:${seconds}`
      }
    }
  }
}
</script>

<style scoped>




.card {
  transition: all .2s ease;
}

.audio-controls {
  /* position: absolute; */
  /* top: 0; */
  width: 100%;
  align-items: center;
  /* border-radius: 6px; */
}

.progress-bar-container {
  /* display: flex; */
  /* width: 100%; */
}

.progress-bar-completed {
  display: flex;
  border-radius: 6px;
  height: 0.5rem;
  background: #41b883;
}

.progress-bar {
  position: relative;
  /* display: flex;
  flex: 1;
  align-items: center; */
  height: 0.5rem;
  border-radius: 6px;
  background-color: #000;
  cursor: pointer;
}

.progress-indicator {
  position: absolute;
  left: 0;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: 1.3rem;
  background-color: #fff;
  border: 1px solid #000;
  bottom: -0.5rem;
  /* box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important; */
  cursor: pointer;
  transition: all .3s ease;
}

.progress-indicator:hover {
  animation: wide .3s ease-in;
}

@keyframes wide {
  0% {
    transform: scale(1, 1);
  }
  99% {
    transform: scale(1.1, 1.1);
  }
}
</style>
