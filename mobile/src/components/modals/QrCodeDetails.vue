<template>
  <ion-modal :is-open="show">
    <ion-content>
      <ion-grid>
        <ion-row class="ion-text-center">
          <ion-col size="12">
            <h1>John Pendenque</h1>
            <ion-avatar>
              <img src="/avatar1.png" alt="Person name">
            </ion-avatar>
          </ion-col>

          <ion-col size="12">
            <ion-card>
              <ion-card-content>
                <qr-code-vue :value="'something-to-use'" :size="200" level="H" />

                <ion-button @click="handleScanCode">
                  Scan code
                </ion-button>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Magnam cum aspernatur eum repellat fugiat voluptatibus minima 
                  deleniti molestiae suscipit aliquid laborum id obcaecati blanditiis, 
                  facilis reprehenderit ex esse enim tenetur.
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12">
            <ion-button @click="authStore.showQrCodeModal=false">
              Close
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { useAuthentictation } from '@/stores/authentication';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonModal, IonRow } from '@ionic/vue';
import { Camera, CameraResultType } from '@capacitor/camera';

// https://www.npmjs.com/package/qrcode.vue
import QrCodeVue from 'qrcode.vue';

// TODO: install: https://github.com/ionic-team/capacitor-barcode-scanner?tab=readme-ov-file#scanbarcode

defineProps({
  show: {
    type: Boolean,
    required: false
  }
})

const authStore = useAuthentictation()

async function handleScanCode() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri
  })
  console.info(image.webPath)
}
</script>
