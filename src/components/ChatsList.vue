<template>
  <v-sheet
    class="primary pa-0 overflow-hidden"
    height="100vh"
    justify="center"
    dark
  >
    <v-app-bar
      height="64"
    >
      <v-app-bar-nav-icon @click="callbacks.toggleDrawer()"></v-app-bar-nav-icon>
      <v-text-field
        class="ml-2"
        hide-details
        dense
        solo
        single-line
        v-model="message"
        clearable
        label="Search"
        type="text"
      ></v-text-field>
    </v-app-bar>

    <v-main
      v-if="chat_list"
      class="c-container fill-height"
      :key="rooms_count"
    >
      <div class="c-sidebar">
        <v-list-item
          v-for="(chat, index) in chat_list"
          :key="index"
          :disabled="chat.id === selected_chat"
          :class="chat.id === selected_chat ? 'primary lighten-1' : null"
          link
          @click="() => {
            callbacks.openChat(chat)
            selected_chat = chat.id
            setMessagesCount()
            setMessages(chat.id)
          }"
        >
          <v-avatar
            class="mr-2 my-2"
            color="grey darken-1"
            size="52"
          ></v-avatar>
          
          <v-list-item-content>
            <v-list-item-title>{{ chat.title }}</v-list-item-title>
            <v-list-item-subtitle single-line>{{ chat.last_message ? `${chat.last_message.sender.id === user.id ? 'You' : chat.last_message.sender.username }: ${chat.last_message.content}` : null }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-sheet
            class="px-1 text-center unread_counter rounded-lg mx-auto transition-swing secondary"
            elevation="0"
            max-width="50"
          >
            <v-list-item-subtitle>
              {{chat.connector && chat.connector[0].unread_count !== 0 ? chat.connector[0].unread_count : null}}
            </v-list-item-subtitle>
          </v-sheet>
        </v-list-item>
      </div>
    </v-main>
  </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      message: null,
      selected_chat: null,
    }
  },
  computed: {
    ...mapGetters('chat', {
      chat_list: 'GET_CHAT_LIST',
      rooms_count: 'GET_ROOMS_COUNT'
    }),
    ...mapGetters('user', {
      user: 'GET_PROFILE'
    }),
  },
  methods: {
    ...mapActions('chat', {
      setChatList: 'SET_CHAT_LIST',
      setMessages: 'SET_MESSAGES',
      setMessagesCount: 'SET_MESSAGES_COUNT',
      appendChat: 'APPEND_CHAT'
    })
  },
  created () {
    this.setChatList()
  },
  mounted () {
    window.Echo.channel(`user_${this.user['id']}`)
      .listen('Rooms', (e) => {
        this.setChatList(e.data)
      })
  },
  props: ['callbacks']
}
</script>

<style scoped>
  .c-container {
    width: 100%;
    position: relative;
  }

  .c-sidebar {
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100vh - 64px);
    overflow-y: auto;
  }

  .unread_counter { 
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>