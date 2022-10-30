<template>
  <section id="profile">
    <div id="header">
      <img src="https://picsum.photos/1200/500" fluid />
      
      <div id="header-intro">
        <h1 class="fw-bold">Hello!</h1>
        <p>Want to edit your profile? Find an old playlist? Put off work for a while? You can do it all here.</p>
      </div>
    </div>
    
    <div class="container mb-4">
      <div class="row">
        <div class="col-sm-12 col-md-8 offset-md-2">
          <h1 class="my-4">Account overview</h1>
  
          <h1 class="h3">Profile</h1>
        </div>
  
        <div class="col-sm-12 col-md-8 offset-md-2">
          <base-input-vue id="name" type="text" placeholder="Name" aria-placeholder="Name" />
          <base-input-vue id="Surname" class="mt-2" type="text" placeholder="Surname" aria-placeholder="Surname" />
          <base-input-vue id="email" class="mt-2" type="email" placeholder="Email" aria-placeholder="Email" />
        </div>
  
        <div class="col-sm-12 col-md-8 offset-md-2 mt-5">
          <base-card-vue class="bg-primary">
            <template #header>
              <h1>My current plan</h1>
            </template>
  
            <template #body>
              <div class="row">
                <div class="col-6">
                  Ad-free music listening, offline listening, and unlimited skips.
                </div>
  
                <div class="col-6">
                  <h2>Payment</h2>
                  <p>Your next bill is for 9,99 € on 2/16/22.</p>
                  <p>
                    Your card ending in 5108
                    Expires: 03/2024
                  </p>
                </div>
              </div>
            </template>
          </base-card-vue>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseCardVue from '@/layouts/bootstrap/cards/BaseCard.vue';
import BaseInputVue from '@/layouts/bootstrap/BaseInput.vue'

export default {
  name: 'ProfileOverView',
  components: {
    BaseCardVue,
    BaseInputVue
  }
}
</script>
