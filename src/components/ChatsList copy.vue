<template>
    <v-sheet
      class="primary fill-height pa-0 overflow-y-hidden"
      justify="center"
      dark
    >
      <v-toolbar>
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
      </v-toolbar>

      
      <v-list
        
      >
        <v-list-item
          v-for="(chat, index) in chats"
          :key="index"
          link
          @click="callbacks.openChat(chat)"
        >
          <v-avatar
            class="mr-2 my-2"
            color="grey darken-1"
            size="52"
          ></v-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ chat.title }}</v-list-item-title>
            <v-list-item-subtitle single-line>{{ chat.message }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
    
</template>

<script>
export default {
  data () {
    return {
      chats: [
        {avatar: 'JD', title: 'John Doe', message: 'sfs dfsdf sdew wef. fefe! Hello, Friend!'},
        {avatar: 'L', title: 'Group - Laravel', message: 'Hello, friend!!'},
        {avatar: 'JD', title: 'John Doe', message: 'sfs dfsdf sdew wef. fefe! Hello, Friend!'},
        {avatar: 'L', title: 'Group - Laravel', message: 'Hello, friend!!'},
        {avatar: 'JD', title: 'John Doe', message: 'sfs dfsdf sdew wef. fefe! Hello, Friend!'},
        {avatar: 'L', title: 'Group - Laravel', message: 'Hello, friend!!'},
        {avatar: 'JD', title: 'John Doe', message: 'sfs dfsdf sdew wef. fefe! Hello, Friend!'},
        {avatar: 'L', title: 'Group - Laravel', message: 'Hello, friend!!'},
        {avatar: 'JD', title: 'John Doe', message: 'sfs dfsdf sdew wef. fefe! Hello, Friend!'},
        {avatar: 'L', title: 'Group - Laravel', message: 'Hello, friend!!'},
        {avatar: 'JD', title: 'John Doe', message: 'sfs dfsdf sdew wef. fefe! Hello, Friend!'},
        {avatar: 'L', title: 'Group - Laravel', message: 'Hello, friend!!'},
      ],
      message: null
    }
  },
  props: ['callbacks']
}
</script>

<style scoped>
  .ovf {
    overflow-y: scroll;
  }
</style>