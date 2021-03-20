<template>
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
          v-for="item in items"
          :key="item.title"
          link
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
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        items: [
          {icon: 'mdi-account', title: 'Dialogs'},
          {icon: 'mdi-account', title: 'Groups'}
        ],
      }
    },
    props: ['drawer']
  }
</script>