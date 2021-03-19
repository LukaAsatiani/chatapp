<template>
  <div class="text-center">
    <v-snackbar
      v-model="notification.show"
      :timeout='5000'
      :color='notification.type'
    >
      {{ notification.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="closeNotification"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('notifications', {
      notification: 'GET_NOTIFICATION'
    })
  },
  methods: {
    ...mapActions('notifications', {
      closeNotification: 'REMOVE_NOTIFICATION'
    })
  }
}
</script>
