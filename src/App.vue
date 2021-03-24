<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
    <c-alert></c-alert>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const defaultLayout = 'default'

export default {
  name: 'App',
  computed: {
    ...mapGetters('user', {
      getProfile: 'GET_PROFILE'
    }),
    ...mapGetters('chat', {
      getMessages: 'GET_MESSAGES'
    }),
    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  },
  methods: {
    ...mapActions ('user', {
      setProfile: 'SET_PROFILE',
    }),
    ...mapActions ({
      startSession: 'START_SESSION',
      setToken: 'SET_SESSION_TOKEN',
      redirect: 'REDIRECT'
    })
  }
}
</script>

<style>

  html {
    overflow-y: auto !important;
  }

  * {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .v-toolbar__content {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
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
