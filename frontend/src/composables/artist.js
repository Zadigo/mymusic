import { ref } from "vue"

export function useArtistComposable (app) {
  const followComplete = ref(false)

  async function followArtist (id) {
    // Follow an artist
    try {
      console.log(app)
      const response = await app.appContext.config.globalProperties.$http.post(`artists/${id}/follow`)
      followComplete.value = response.data.state
    } catch (e) {
      console.log(e)
    }
  }

  return {
    followArtist,
    followComplete
  }
}
