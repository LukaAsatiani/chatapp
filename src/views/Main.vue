<template>
  <v-row
    class="fill-height ma-0 d-flex" 
    v-if="getProfile"
  > 
    <Drawer v-model="drawer" :callbacks="{showWindow, closeWindow}"/>
    <Window v-model="window.show">
      <component :is="window.component" />
    </Window>
    <ChatBodyWindow v-model="chat_window">
      <c-chats-body class="fill-height" v-if="currentChat" :callbacks="{back}" :chat="currentChat"/>
    </ChatBodyWindow>
    <v-col
      cols="12"
      class="pa-0"
      sm="4"
    >
      <c-chats-list :callbacks="{toggleDrawer, openChat}"/>
    </v-col>
    <v-col
      v-if="!$vuetify.breakpoint.xsOnly"
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
import Drawer from '@/components/Drawer'
import ChatBodyWindow from '@/components/ChatBodyWindow'
import Window from '@/components/Window'

export default {
  name: 'Home',
  components: {
    ChatBodyWindow,
    Drawer,
    Window
  },
  data () {
    return {
      window: {
        show: false,
        component: ''
      },
      chat_window: false,
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
      this.chat_window = true
    },
    showWindow (component) {
      this.window = {
        show: true,
        component: component
      }
    },
    closeWindow () {
      this.window = {
        show: false,
        component: ''
      }
    },
    back () {
      this.chat_window = false
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
