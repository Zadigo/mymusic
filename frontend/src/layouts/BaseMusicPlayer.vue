<template>
  <div class="container">
    <div class="py-1">
      <div class="p-1 mb-3 text-center">
        <button :class="[!canPlay ? 'disabled' : null]" type="button" class="btn btn-primary" @click="handleSkipPrevious">
          <font-awesome-icon icon="fa-solid fa-backward-step" />
        </button>
      
        <button :class="[!canPlay ? 'disabled' : null]" type="button" class="btn btn-primary mx-1" @click="toggleAudioPlay">
          <font-awesome-icon v-if="isPlaying" icon="fa-solid fa-pause"></font-awesome-icon>
          <font-awesome-icon v-else icon="fa-solid fa-play"></font-awesome-icon>
        </button>
      
        <button :class="[!canPlay ? 'disabled' : null]" type="button" class="btn btn-primary" @click="handleSkipNext">
          <font-awesome-icon icon="fa-solid fa-forward-step" />
        </button>

        <button :class="[!canPlay ? 'disabled' : null]" type="button" class="btn btn-primary mx-1" @click.prevent>
          <font-awesome-icon icon="fa-solid fa-repeat" />
        </button>
      
        <button type="button" class="btn btn-info shadow-sm">
          <!-- <span class="mdi mdi-volume-high"></span> -->
          <!-- <span class="mdi mdi-volume-low"></span> -->
          <font-awesome-icon icon="fa-solid fa-volume-up" />
        </button>
      </div>

      <div>
        <audio ref="audioPlayer" preload="metadata" @loadedmetadata="updateAudioDetails" @timeupdate="updateAudioDetails" @waiting="showSpinner=true" @canplay="showSpinner=false">
          <!-- <source :src="require('../assets/music1.wav')" type="audio/mpeg"> -->
          <!-- <source :src="checkSrc(src)" type="audio/mpeg"> -->
          <source :src="src" type="audio/mpeg">
        </audio>
  
        <div class="audio-controls">
          <div class="music-control-progress-container">
            <div ref="videoProgress" class="track" @click.stop.prevent="handleProgressBarClick($event)">
              <div :style="{ width: `${progressPercentage}%` }" class="track-low"></div>
              <div class="track-selection"></div>
            </div>
          
            <div :style="{ left: `${progressPercentage}%` }" class="handle"></div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-12 mt-1 d-flex justify-content-between">
            <span>{{ formattedCurrentTime }}</span>
            <span>{{ formattedDuration }}</span>
          </div>
        </div>
      </div>
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
    'player-error' () { 
      return true
    },
    'player-ready' () { 
      return true
    },
    'playing' () { 
      return true
    },
    'completed' () { 
      return true
    },
    'paused' () { 
      return true
    },
    'skipped-backwards' () { 
      return true
    },
    'update:time' () { 
      return true
    },
    'next-song' () { 
      return true
    },
    'count:view' () {
      return true
    }
  },
  data () {
    return {
      showSpinner: true,
      duration: 0,
      currentTime: 0,
      isPlaying: false,
      
      countView: false,
      seekedTime: 0,
      viewEmitLimit: 30
    }
  },
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
    },
    wasSeeked () {
      return this.seekedTime > 0
    }
  },
  watch: {
    src (current, previous) {
      console.log(current, previous)
      if (current !== previous) {
        // NOTE: We have to manually set the source
        // on the audio since once mounted, Vue does not
        // automatically remount the tag with the source
        this.$refs.audioPlayer.src = current
        this.updateAudioDetails()
        // this.toggleAudioPlay()
      }
    },
    togglePlay () {
      // FIXME: This might be the source
      // of a recursive self update
      this.toggleAudioPlay()
    },
    currentTime (current) {
      if (this.isPlaying && current === this.duration) {
        this.$emit('completed')
      }

      if (!this.countView && current >= this.seekedTime) {
        // Emit an event when the user has
        // listened to a track more than
        // 30 seconds. This is extremely
        // useful for streaming projects
        this.$emit('count:view')
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
      // FIXME: Apparently this section creates a recursive
      // update of itself. This needs to be fixed
      try {
        // if (!this.$refs?.audioPlayer.src || this.$refs?.audioPlayer.src === '') {
        //   this.$refs?.audioPlayer.src = this.src
        // }

        if (this.$refs?.audioPlayer.paused) {
          this.isPlaying = true
          this.$refs.audioPlayer.play()
          this.$emit('playing')
        } else {
          this.isPlaying = false
          this.$refs.audioPlayer.pause()
          this.$emit('paused', this.currentTime)
        }
      } catch (error) {
        // this.$refs.alert.showAlert()
        this.$emit('player-error', 'Could not start track')
      }
    },
    updateAudioDetails () {
      this.duration = this.$refs.audioPlayer.duration
      this.currentTime = this.$refs.audioPlayer.currentTime
    },
    handleSkipPrevious () {
      try {
        this.$emit('skipped-backwards', this.formattedCurrentTime)
        this.$refs.audioPlayer.currentTime = 0
      } catch (error) {
        console.error(error)
      }
    },
    handleSkipNext () {
      // Get the next song
      this.$emit('next-song')
    },
    handleProgressBarClick (e) {
      // When the user seeks a time on the track
      const currentTime = (this.duration * e.offsetX) / this.$refs.videoProgress.offsetWidth
      this.currentTime = currentTime
      this.$refs.audioPlayer.currentTime = currentTime

      // Facilitates the way in which an event
      // is sent when the user has listened
      // to at least 30s of the track
      this.seekedTime = currentTime

      const viewEmitLimit = currentTime + 30
      if (viewEmitLimit > this.duration) {
        // TODO: If the difference between the seeked
        // time and the duration of the track is less
        // than 30s then we should consider the track
        // to not be listened to?
        this.viewEmitLimit = this.duration
      } else {
        this.viewEmitLimit = viewEmitLimit
      }
      
      this.$emit('update:time', currentTime)
    },
    handleDrag (e) {
      e
      // if (e.x !== 0 && e.y !== 0) {
      //   const track = this.$refs.progress
      //   if (track) {
      //     let drag = 0
      //     const left = e.pageX - track.getBoundingClientRect().left
      //     drag = left

      //     if (left < 0) {
      //       drag = 0
      //     }

      //     if (left > track.offsetWidth) {
      //       drag = track.offsetWidth
      //     }

      //     console.log(this.duration * (drag / track.offsetWidth))
      //   }
      // }
    },
    formatTime (value) {
      let hours = Math.floor(value / 3600)
      let minutes = Math.floor((value % 3600 / 60))
      let seconds = Math.floor(value % 60)

      hours = hours < 10 ? '0' + hours : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      if (hours > 0) {
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

.music-control-progress-container {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 100% !important;
  height: 20px;
  margin-bottom: .5rem;
}

.music-control-progress-container .track {
  position: absolute;
  cursor: pointer;
  background-color: white;
  background-repeat: repeat-x;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
  border-radius: 4px;
  height: 10px;
  width: 100%;
  margin-top: -5px;
  top: 50%;
  left: 0;
}

.music-control-progress-container .track-low {
  position: absolute;
  height: 100%;
  top: 0;
  bottom: 0;
  background: transparent;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #0d6efd;
  /* width: 50%; */
}

.music-control-progress-container .handle {
  position: absolute;
  background-color: #fff !important;
  background-repeat: repeat-x;
  top: 0;
  width: 20px;
  height: 20px;
  filter: none;
  border: 0 solid transparent;
  border-radius: 50%;
  margin-left: -10px;
}
</style>
