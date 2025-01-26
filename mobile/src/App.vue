<template>
  <ion-app>
    <ion-router-outlet />

    <!-- Modals -->
    <profile-base-modal />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { SplashScreen } from '@capacitor/splash-screen';
import { Device } from '@capacitor/device';

import ProfileBaseModal from '@/components/modals/profile/BaseModal.vue';
import { onMounted } from 'vue';

async function logDeviceInfo() {
  const info = await Device.getInfo();

  console.log(info);
}

logDeviceInfo()

onMounted(async () => {
  await SplashScreen.show({
    autoHide: true,
  });
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
</style>
