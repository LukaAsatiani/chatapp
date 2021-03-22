<template>
  <v-navigation-drawer
    v-model="show"
    absolute
    temporary
    class="primary lighten-1"
  >
    <v-sheet
      color="secondary"
      class="pa-4"
    >
      <v-avatar
        class="mb-4"
        color="grey darken-1"
        size="64"
      ></v-avatar>

      <v-list-item
        dark
        class="ma-0 pa-0"
      >
        <v-list-item-content>
          <v-list-item-title class="title">
            {{getProfile.username}}
          </v-list-item-title>
          <v-list-item-subtitle>{{getProfile.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-sheet>

    <v-divider></v-divider>

    <v-list
      dense
      dark
    >
      <v-list-item
        v-for="item in menu"
        :key="item.title"
        link
        @click="item.callback ? item.callback() : null"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      menu: [
        {icon: 'mdi-account', title: 'Dialogs', callback: null},
        {icon: 'mdi-account-group', title: 'Groups', callback: () => {
          this.callbacks.showWindow('c-create-room-window')
          this.$emit('input', false)
        }},
        {icon: 'mdi-logout', title: 'Logout', callback: this.logout}
      ],
    }
  },
  props: {
    value: Boolean,
    callbacks: Object
  },
  computed: {
    ...mapGetters('user', {
      getProfile: 'GET_PROFILE'
    }),
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    ...mapActions('auth', {
      logout: 'AUTH_LOGOUT'
    })
  }
}
</script>