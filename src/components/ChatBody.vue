<template>
  <v-main>
    <v-toolbar
      :elevation="0"
      class="fill-height"
    >
      <v-btn
        icon
        class="hidden-xs-only"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>{{chat.title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        class="hidden-xs-only"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
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
        ></v-text-field>
      </v-col>
    </v-footer>
  </v-main>
</template>

<script>
  export default {
    props: ['chat'],
    data () {
      return {
        password: 'Password',
        show: false,
        message: 'Hey!',
        marker: true,
        iconIndex: 0,
      }
    },
    methods: {
      sendMessage () {
        this.clearMessage()
      },
      clearMessage () {
        this.message = ''
      }
    }
  }
</script>

<style scoped>
  .v-text-field:not(.error--text) .v-text-field__details { display: none }

</style>