<template>
  <section id="profile">
    <div id="header">
      <b-img src="https://picsum.photos/1200/500" fluid />
      
      <div id="header-intro">
        <h1 class="font-weight-bold">Hello!</h1>
        <p>Want to edit your profile? Find an old playlist? Put off work for a while? You can do it all here.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-8">
        <h1 class="my-4">Account overview</h1>

        <h1 class="h3">Profile</h1>
      </div>
      
      <div class="col-8">
        <b-form-input type="text" placeholder="Name" aria-placeholder="Name" />
        <b-form-input class="mt-2" type="text" placeholder="Surname" aria-placeholder="Surname" />
        <b-form-input class="mt-2" type="email" placeholder="Email" aria-placeholder="Email" />
      </div>

      <div class="col-8">
        <b-card header-class="bg-light">
          <template #header>
            <h1>My current plan</h1>
          </template>

          <b-card-text>
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
          </b-card-text>
        </b-card>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style scoped>
  #header {
    position: relative;
    /* padding: 2rem; */
  }

  #header #header-intro {
    position:absolute;
    padding: 2rem;
    color: white;
    top: 20%;
    left: 0;
  }
</style>
