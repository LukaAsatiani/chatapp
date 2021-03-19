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
    layout() {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  },
  methods: {
    ...mapActions ('user', {
      setProfile: 'SET_PROFILE'
    }),
    ...mapActions ('auth', {
      setToken: 'SET_TOKEN'
    }),
    async setProfile_async (){
      let r = await this.setProfile()
      if(r)
        this.logged = true
    }
  },
  data: () => ({
    drawer: null,
    logged: null,
    async: null
  }),
  created() {
    // this.$session.destroy()
    if(!this.$session.exists()){
      this.$session.start()
      this.setProfile({logged: false})
    } else {
      if (this.$session.get('token')) {
        this.setToken(this.$session.get('token'))
        this.setProfile_async()
      } else {
        this.setProfile({logged: false})
      }
    }
  },
  mounted () {
    window.Echo.channel('chats')
      .listen('Chats', (e) => {
        console.log(e)
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

</style>
