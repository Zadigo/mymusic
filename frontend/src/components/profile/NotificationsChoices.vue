<template>
  <section id="notifications">
    <div class="container my-4">
      <div class="row">
        <div class="col-sm-12 col-md-10 offset-md-1">
          <h1 class="mb-3">Préférences de notification</h1>
        </div>

        <div class="col-sm-12 col-md-10 offset-md-1">
          <base-card>
            <template #header>
              <h3>{{ $t('Email') }}</h3>  
            </template>
            
            <template #body>
              <base-list-group-checkbox-vue :items="notificationChoices" />
            </template>
          </base-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseCard from '@/layouts/bootstrap/cards/BaseCard.vue'
import BaseListGroupCheckboxVue from '@/layouts/bootstrap/listgroups/BaseListGroupCheckbox.vue'

export default {
  name: 'NotificationsView',
  components: {
    BaseCard,
    BaseListGroupCheckboxVue
  },
  data () {
    return {
      notificationChoices: [
        {
          name: 'Recommandations musicales',
          subtitle: 'Les titres que vous pourriez aimer'
        },
        {
          name: 'Nouveautés musicales',
          subtitle: "Nouveaux titres d'artistes auxquels vous êtes abonné ou que vous pourriez aimer"
        },
        {
          name: "Mise à jour d'une playlist",
          subtitle: "Une playlist que vous suivez a été mise à jour"
        },
        {
          name: "Infos sur les concerts",
          subtitle: "Mises à jour sur les représentations virtuelles et en direct d'artistes que vous aimez, en ligne ou près de chez vous"
        },
        {
          name: "Mise à jour d'un artiste",
          subtitle: "Découvrez les actualités d'artistes que vous écoutez ou que vous pourriez aimer"
        }
      ]
    }
  }
}
</script>
