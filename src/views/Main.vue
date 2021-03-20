<template>
  <v-row
    class="fill-height ma-0 d-flex" 
    v-if="getProfile"
  > 
    <v-navigation-drawer
      v-model="drawer"
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
    <v-col
      cols="12"
      class="pa-0"
      sm="4"
    >  
      <c-chats-list :callbacks="{toggleDrawer, openChat}"/>
    </v-col>
    <v-col
      sm="8"
      class="pa-0"
    >
      <v-sheet
        class="primary lighten-2 fill-height pa-0"
        justify="center"
        dark
      >
        <c-chats-body class="fill-height" v-if="currentChat" :chat="currentChat"/>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      drawer: null,
      menu: [
        {icon: 'mdi-account', title: 'Dialogs', callback: null},
        {icon: 'mdi-account-group', title: 'Groups', callback: null},
        {icon: 'mdi-logout', title: 'Logout', callback: this.logout}
      ],
      currentChat: null
    }
  },
  computed: {
    ...mapGetters('user', {
      getProfile: 'GET_PROFILE'
    }),
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    openChat (chat) {
      this.currentChat = chat
    },
    ...mapActions('auth', {
      logout: 'AUTH_LOGOUT'
    }),
    ...mapActions ('user', {
      setProfile: 'SET_PROFILE',
    }),
    ...mapActions ({
      setToken: 'SET_SESSION_TOKEN',
      redirect: 'REDIRECT'
    })
  }
  
}
</script>
