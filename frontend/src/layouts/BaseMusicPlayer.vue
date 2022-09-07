<template>
  <div class="card bg-transparent">
    <div class="card-body position-relative">
      <audio ref="link" preload="auto" @loadedmetadata="updateAudioDetails" @timeupdate="updateAudioDetails" @waiting="showSpinner = true" @canplay="showSpinner = false">
        <!-- <source :src="require('../assets/music1.wav')" type="audio/mpeg"> -->
        <source :src="checkSrc(src)" type="audio/mpeg">
      </audio>

      <div class="audio-controls">
        <div class="progress-bar-container">
          <div ref="progress" class="progress-bar" @click.prevent.stop="handleProgressBarClick">
            <div :style="{ width: progressPercentage + '%' }" class="progress-bar-completed">
              <div :style="{ left: progressPercentage + '%' }" class="progress-indicator" draggable @mousedown="handleDrag" />
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
      <div class="btn-group shadow-sm">
        <button :class="[!canPlay ? 'disabled' : null]" type="button" class="btn btn-primary" @click="handleSkipPrevious">
          <font-awesome-icon icon="fa-solid fa-backward-step" />
        </button>

        <button :class="[!canPlay ? 'disabled' : null]" type="button" class="btn btn-primary" @click="toggleAudioPlay">
          <font-awesome-icon v-if="togglePlay" icon="fa-solid fa-pause"></font-awesome-icon>
          <font-awesome-icon v-else icon="fa-solid fa-play"></font-awesome-icon>
        </button>

        <button :class="[!canPlay ? 'disabled' : null]" type="button" class="btn btn-primary" @click="handleSkipNext">
          <font-awesome-icon icon="fa-solid fa-forward-step" />
        </button>
      </div>

      <button type="button" class="btn btn-info shadow-sm mt-1">
        <!-- <span class="mdi mdi-volume-high"></span> -->
        <!-- <span class="mdi mdi-volume-low"></span> -->
        <font-awesome-icon icon="fa-solid fa-volume-up" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseMusicPlayer',
  props: {
    src: {
      type: String,
      required: true
    },
    togglePlay: {
      type: Boolean
    }
  },
  emits: {
    'player-error': () => true,
    'player-ready': () => true,
    'playing': () => true,
    'completed': () => true,
    'paused': () => true,
    'skipped-backwards': () => true,
    'skipped': () => true,
    'next-song': () => true
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
  computed: {
    formattedDuration () {
      return this.formatTime(this.duration)
    },
    formattedCurrentTime () {
      return this.formatTime(this.currentTime)
    },
    progressPercentage () {
      if (this.currentTime === 0 && this.duration === 0) {
        return 0
      } else {
        return (this.currentTime / this.duration) * 100
      }
    },
    canPlay () {
      return this.checkSrc(this.src) !== null
    }
  },
  watch: {
    src (current, previous) {
      if (current !== previous) {
        this.$refs.link.src = this.checkSrc(current)
        this.updateAudioDetails()
        this.toggleAudioPlay()
      }
    },
    togglePlay () {
      this.toggleAudioPlay()
    },
    currentTime (current) {
      if (this.isPlaying && current === this.duration) {
        this.$emit('completed')
      }
    }
  },
  methods: {
    checkSrc (src) {
      if (!src) {
        return null
      } else {
        // When there is no active song, the player
        // sends an "http://127.0.0.1:8000/undefined"
        // request to the backend. This protects
        // against that
        const url = new URL(src)
        return url.pathname === '/undefined' ? null : url.toString()
      }
    },
    toggleAudioPlay () {
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
      } catch (error) {
        // this.$refs.alert.showAlert()
        this.$emit('player-error', 'Could not start track')
      }
    },
    updateAudioDetails () {
      this.duration = this.$refs.link.duration
      this.currentTime = this.$refs.link.currentTime
    },
    handleSkipPrevious () {
      try {
        this.$emit('skipped-backwards', this.formattedCurrentTime)
        this.$refs.link.currentTime = 0
      } catch (error) {
        console.error(error)
      }
    },
    handleSkipNext () {
      // Get the next song
      this.$emit('next-song')
    },
    handleProgressBarClick (e) {
      const previousTime = this.currentTime
      const currentTime = (this.duration * e.offsetX) / this.$refs.progress.offsetWidth

      this.currentTime = currentTime
      this.$refs.link.currentTime = currentTime
      this.$emit('skipped', [previousTime, this.currentTime])
    },
    handleDrag (e) {
      if (e.x !== 0 && e.y !== 0) {
        const track = this.$refs.progress
        if (track) {
          let drag = 0
          const left = e.pageX - track.getBoundingClientRect().left
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
    formatTime (value) {
      let hours = Math.floor(value / 3600)
      let minutes = Math.floor((value % 3600 / 60))
      let seconds = Math.floor(value % 60)

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
