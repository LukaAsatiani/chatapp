<template>
  <v-card color=""
    height="300"
  >
    <v-toolbar
      color="secondary darken-2"
      dark
    >
      Rooms
      <v-spacer />
      <v-btn
        icon
        dark
        @click="close()"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row
      class="fill-height ma-0 c-container"
    >
      <v-col 
        cols="12"
        class="scrollable ma-0 pa-0"
      >
        <v-list-item
          v-for="(chat, index) in chat_list"
          :key="index"
          class="mx-0"
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
          <v-btn
            class="secondary darken-2"
            @click="() => {
              joinToRoom({room_id: chat.id, user_id: getProfile.id})
              close()
            }"
          >
            Join
          </v-btn>
        </v-list-item>
      </v-col>      
    </v-row>
  </v-card>      
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import rulesGenerate from '@/validation/rules'

  export default {
    props: {
      close: Function
    },
    data () {
      return {
        valid: null,
        fields: {
          title: ''
        },
        rules: {
          title: 'required|min:8|max:21'
        }
      }
    },
    computed: {
      nRules: function () {
        return rulesGenerate(this.rules)
      },
      ...mapGetters('chat', {
        chat_list: 'GET_SEARCH_CHAT_LIST'
      }),
      ...mapGetters('user', {
        getProfile: 'GET_PROFILE'
      }),
    },
    methods: {
      ...mapActions('chat', {
        setChatList: 'SET_SEARCH_CHAT_LIST',
        joinToRoom: 'ADD_USER_TO_ROOM'
      }),
    },
    created () {
      this.setChatList()
    },
    mounted () {
      
    }
  }
</script>

<style scoped>
  .scrollable {
    overflow-y: auto;
    height: 100%;
  }

  .c-container {
    overflow: hidden;
    height: calc(100% - 56px)
  }

</style>