import { mapState } from 'vuex'

export default {
    props: {
        songs: {
            type: Array,
                required: true
        }
    },

    computed: {
        ...mapState('playerModule', ['isPlaying']),

        hasSongs() {
            return this.songs.length > 0
        }
    }
}
