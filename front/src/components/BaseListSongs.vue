<template>
  <b-list-group>
    <b-list-group-item v-for="i in 5" :key="i" class="d-flex justify-content-between" @click="() => {}">
      <div id="infos" class="row">
        <div class="col-auto">
          <b-img src="http://via.placeholder.com/40" rounded fluid />
        </div>

        <div class="col-auto">
          <div class="d-flex flex-column">
            <span>Song name</span>
            <span class="text-muted">Artist name</span>
          </div>
        </div>
      </div>

      <div id="actions">
        <font-awesome-icon class="mx-4" icon="heart" />
        <time datetime="3M20S">3:20</time>

        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon v-on="on">
              <font-awesome-icon icon="ellipsis-v" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <v-list-item>
                Aller sur la page de l'artiste
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
// Component used to list songs using
// a list group

export default {
  name: 'BaseListSongs',
  props: {
    songs: {
      type: Array,
      required: true
    }
  }
}
</script>
