<template>
  <v-card color="">
    <v-toolbar
      color="secondary darken-2"
      dark
    >
      Create room
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
      class="fill-height px-3 ma-0"
    >
      <v-col cols="12" class="text-center">
        <v-avatar
          class="mx-auto"
          color="grey darken-1"
          size="96"
        ></v-avatar>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            autocomplete="off"
            spellcheck="false"
            class="secondary--text mt-4 pa-0"
            height="40"
            single-line
            label="Room title"
            type="text"
            :rules="nRules['title']"
            v-model="fields['title']"
          ></v-text-field>
        </v-form>
        <div
          class="error"
          width="100%"
        >
          <v-btn
            class="secondary darken-2 float-right mt-3"
            @click="validate"
          >
            Create
          </v-btn>
        </div>
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
      ...mapGetters('user', {
        getProfile: 'GET_PROFILE'
      })
    },
    methods: {
      ...mapActions('chat', {
        createRoom: 'CREATE_ROOM'
      }),
      async validate () {
        if (this.$refs.form.validate()) {
          const response = await this.createRoom(this.fields)
          
          if (!response.success) {
            this.fields = response.fields
          } else {
            this.close()
          }
        }
      }
    }
  }
</script>