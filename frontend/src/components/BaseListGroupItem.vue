<template>
  <a href class="list-group-item list-group-item-action d-flex justify-content-between bg-dark text-light align-items-center p-3" @click.prevent>
    <div class="d-flex flex-column">
      <span>
        {{ song.name }}
        <font-awesome-icon icon="fa-solid fa-e" class="ms-3" />
      </span>

      <router-link :to="{ name: 'artist_view', params: { id: 'nnoin' } }" class="text-muted text-decoration">
        {{ album.artist.name }}
      </router-link>
    </div>

    <div class="btn-group">
      <v-btn v-if="isPlaying && store.isCurrentSong(song)" variant="tonal" color="light" rounded>
        <font-awesome-icon :icon="['fas', 'pause']" />
      </v-btn>
    
      <v-btn v-else class="ms-2" variant="tonal" color="light" rounded>
        <font-awesome-icon :icon="['fas', 'play']" />
      </v-btn>

      <v-btn class="ms-2" variant="tonal" color="light" rounded>
        <font-awesome-icon :icon="['fas', 'heart']" />
      </v-btn>
      
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in menuItems" :key="i" :value="index" @click="handleMenuSelection(item, i)">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </a>
</template>

<script>
// import { ref } from 'vue';

export default {
  name: 'BaseListGroupItem',
  props: {
    album: {
      type: Object,
      required: true
    },
    song: {
      type: Object,
      required: true
    }
  },
  setup () {
    const menuItems = [
      'Save',
      'Share',
      'Add to playlist',
      'Recommend'
    ]
    return {
      menuItems
    }
  },
  methods: {
    handleMenuSelection (name, index) {
      name
      index
    }
  }
}
</script>
