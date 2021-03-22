<template>
  <v-main>
    <v-app-bar
      :elevation="0"
      class="fill-height"
      height="64"
    >
      <v-btn
        icon
        v-if="$vuetify.breakpoint.xsOnly"
        @click="callbacks.back()"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{chat.title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        class="hidden-xs-only"
      >
        <v-icon>mdi-vertical-dots</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main
      class="overflow-hidden chat-body"
      data-booted="true"
      max-height="100"
    > 
      <v-sheet
        v-if="messages_count === null"
        class="text-center fill-height transparent"
      >
        <v-row 
          align="center"
          justify="center"
          class="fill-height pa-0 ma-0"
        >
          <v-progress-circular
            :size="30"
            :width="7"
            color="info"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </v-sheet>
      <v-sheet
        v-if="messages_count === 0"
        class="text-center fill-height transparent"
      >
        <v-row 
          align="center"
          justify="center"
          class="font-weight-bold text-h5 fill-height pa-0 ma-0"
        >
          Empty
        </v-row>
      </v-sheet>
      <v-sheet
        ref="scrollableComponent"
        class="pa-4 transparent scrollable"
        v-else
      > 
        <v-card
          width="100%"
          v-for="(message, index) in messages"
          :key="index"
        >
          <v-sheet
            width="70%"
            class="transparent float-left"
            v-if="user.id !== message.sender_id"
          >
            <v-avatar
              class="mr-2 float-left"
              color="grey darken-1"
              size="32"
            ></v-avatar>
              <v-card
                class="ma-0 mb-1 pa-1 primary float-left"
                max-width="80%"
              > 
                <span
                  class="font-weight-bold accent--text"
                >
                  {{message.sender.username}}
                </span>
                <br/>
                <span class="white--text">
                  {{message.content}}
                </span>
              </v-card>
          </v-sheet>
          <v-sheet
            v-else
            width="70%"
            class="transparent float-right"
          >
              <v-card
                class="ma-0 mb-1 pa-1 secondary float-right"
              >
                <span class="white--text">
                  {{message.content}}
                </span>
              </v-card>
          </v-sheet>  
        </v-card>
      </v-sheet>
    </v-main>
    <v-footer
      absolute
      class="font-weight-medium pa-0"
    >
      <v-col
        class="text-center py-2"
        cols="12"
        align="left"
      >
        <v-text-field
          hide-details
          class="secondary--text"
          dense
          single-line
          v-model="message"
          append-outer-icon="mdi-send"
          filled
          clear-icon="mdi-close-circle"
          clearable
          label="Message"
          type="text"
          @click:append-outer="sendMessage"
          @click:clear="clearMessage"
          @keyup.enter.prevent="sendMessage"
        ></v-text-field>
      </v-col>
    </v-footer>
  </v-main>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: ['chat', 'callbacks'],
    data () {
      return {
        password: 'Password',
        show: false,
        message: '',
        marker: true,
        iconIndex: 0,
      }
    },  
    computed: {
      ...mapGetters('chat', {
        messages: 'GET_MESSAGES',
        messages_count: 'GET_MESSAGES_COUNT'
      }),
      ...mapGetters('user', {
        user: 'GET_PROFILE'
      }),
    },
    methods: {
      ...mapActions('chat', {
        send: 'SEND_MESSAGE'
      }),  
      ...mapActions('chat', {
        appendMessage: 'APPEND_MESSAGE'
      }),
      sendMessage () {
        if(this.message !== ''){
          // this.messages[Object.keys(this.messages).length] = {content: this.message, sender_id: this.user.id}
          this.send({sender_id: this.user.id, room_id: this.chat['id'], content: this.message})
          this.scrollBottom()
          this.clearMessage()
        }
      },
      clearMessage () {
        this.message = ''
      },
      scrollBottom () {
        if(Object.keys(this.messages).length > 0)
          document.getElementsByClassName('scrollable')[0].scrollTo(0, document.getElementsByClassName('scrollable')[0].scrollHeight)
      }
    },
    beforeUpdate () {
      this.$nextTick(() => {
        this.scrollBottom()
      }, 200)
    },
    mounted () {
      window.Echo.channel('chats')
        .listen('Messages', (e) => {
          this.appendMessage(e)
        })
    }
  }
</script>

<style scoped>
  .v-text-field:not(.error--text) .v-text-field__details { display: none }
  
  .chat-body {
    height: calc(100vh - 120px);
    overflow: hidden;
  }
  
  .scrollable {
    overflow-y: scroll;
    height: 100%;
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
