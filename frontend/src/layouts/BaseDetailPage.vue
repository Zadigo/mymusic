<template>
  <section>
    <div ref="link" class="bg-dark px-4 py-5 bg-image">
      <div class="py-5">
        <slot></slot>

        <!-- <div class="mask"></div> -->
        <div class="fader"></div>
      </div>
    </div>

    <div class="container">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
import { useUrls } from '@/composables/utils'

export default {
  name: 'BaseDetailPage',
  props: {
    image: {
      type: String,
      required: true
    }
  },
  setup () {
    const { mediaUrl } = useUrls()
    return {
      mediaUrl
    }
  },
  mounted () {
    const url = this.mediaUrl(this.image)
    this.$refs.link.style.backgroundImage = `url(${url})`
  }
}
</script>

<style scoped>
.bg-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 500px;
}

.mask {

}

.fader {
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(38, 38, 38, 1), rgba(38, 38, 38, 0));
  width: 100%;
  height: 45%;
}
</style>
