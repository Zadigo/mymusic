<template>
  <section id="profile">
    <component :is="store.profileComponentName" />
  </section>
</template>

<script>
import { useAuthentication } from '@/store/authentication'

import NotificationsChoices from '@/components/profile/NotificationsChoices.vue'
import ProfileOverview from '@/components/profile/ProfileOverview.vue'

export default {
  name: 'ProfileView',
  components: {
    NotificationsChoices,
    ProfileOverview
  },
  setup () {
    const store = useAuthentication()
    return {
      store
    }
  }
}
</script>
