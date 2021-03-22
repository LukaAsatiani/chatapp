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
            <v-list-item-subtitle single-line>{{ '' }}</v-list-item-subtitle>
          </v-list-item-content>
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
      chat_list: 'GET_CHAT_LIST'
    })
  },
  methods: {
    ...mapActions('chat', {
      setChatList: 'SET_CHAT_LIST',
      setMessages: 'SET_MESSAGES',
      setMessagesCount: 'SET_MESSAGES_COUNT'
    })
  },
  created () {
    this.setChatList()
  },
  mounted () {
    window.Echo.channel('chats')
      .listen('Rooms', (e) => {
        console.log(e)
        // this.appendMessage(e)
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
    height: 90%;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #1c7e72;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(174, 74%, 20%);
  }
</style>