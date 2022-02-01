import Vue from 'vue'
import store from '../store/index'
// import { mapState } from 'vuex'

 var _ = require('lodash')

var baseAudio = Vue.extend({
    name: 'BaseAudio',
    props: {
        src: {
            type: String,
            required: true
        }
    },

    data () {
        return {
            player: null,

            isPlaying: false,
            currentTime: 0,
            durationMinutes: null,
            durationSeconds: null,
            metaDataLoaded: false
        }
    },

    computed: {
        hasSourceFile() {
            return !_.isUndefined(this.src)
        },

        playerLoaded() {
            return !_.isNull(this.player)
        },

        completionPercentage() {
            return Math.floor(this.currentTime / this.durationSeconds * 100)
        }
    },

    beforeMount () {
        // If we have a source file provided, 
        // immediately create a player otherwise
        // this will be deferred until the user
        // selects a given song
        if (this.hasSourceFile) {
            this.createAudioPlayer(this.src)
        }
    },
    
    beforeDestroy() {
        this.player = null
    },

    methods: {
        getMetaData () {
            // console.log(this.player.duration)
            var minutes = Math.floor(this.player.duration / 60)
            var seconds = Math.floor(this.player.duration)

            this.durationSeconds = seconds
            this.durationMinutes = minutes
            this.metaDataLoaded = true
            // console.log(this.durationseconds)
        },

        setTrack (src) {
            this.player.src = src
        },

        play () {
            this.player.play()
            store.commit('playerModule/play')
        },
        
        pause () {
            this.player.pause()
            store.commit('playerModule/pause')
        },

        createAudioPlayer (src) {
            // Creates a new Audio player in order
            // to read the music
            const player = new Audio(src)

            player.loop = false
            player.volume = 1
            player.muted = false

            player.onplay = () => { this.isPlaying = true }
            player.onpause = () => { this.isPlaying = false }
            player.onloadeddata = (e) => { this.getMetaData(e) }
            player.ontimeupdate = () => { this.currentTime = player.currentTime }
            player.onended = (e) => { e }

            this.player = player
        },

        createIcon(c, name) {
            // Creates the font awesome icon for
            // the given button
            return c('font-awesome-icon', { props: { icon: name } })
        },

        createPlayPauseButton (c) {
            // Returns the play button if the audio is playing
            // otherwise rreturns the pause one
            if (!this.isPlaying) {
                return c('v-btn', { on: { click: () => { this.play() } } }, [this.createIcon(c, 'play')])
            } else {
                return c('v-btn', { on: { click: () => { this.pause() } } }, [this.createIcon(c, 'pause')])
            }
        }
    },
    
    filters: {
        formatTime () {

        }
    },

    watch: {
        src (newValue) {
            // Watches for song changes/selection
            // and sets th player to the current
            // selected song
            if (!_.isUndefined(newValue)) {
                if (!this.playerLoaded) {
                    this.createAudioPlayer(newValue)
                    this.play()
                } else {
                    this.player.src = newValue
                    this.play()
                }
            }
        }
    },

    render: function (c) {
        var attributes = {
            attrs: {
                id: 'track'
            },
            ref: 'link'
        }
        // return c('div', attributes, this.$scopedSlots.default)
        return c('div', attributes, [
            this.createPlayPauseButton(c),
            c('span', {}, [this.currentTime]),
            c('v-btn', { class: 'mt-2' }, [this.createIcon(c, 'step-backward')]),
            c('v-btn', { class: 'mt-2' }, [this.createIcon(c, 'step-forward')]),
            c('v-btn', { class: 'mt-2' }, [this.createIcon(c, 'redo-alt')]),
            c('v-btn', { class: 'mt-2' }, [this.createIcon(c, 'random')]),
            c('v-progress-linear', { props: { value: this.completionPercentage, rounded: true } })
        ])
    }
})

Vue.component('base-audio', baseAudio)
