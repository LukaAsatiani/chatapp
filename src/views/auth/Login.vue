<template>
  <Auth title="Login">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="px-3"
    >
      <v-text-field
        autocomplete="off"
        spellcheck="false"
        label='Email'
        name='email'
        prepend-icon='mdi-email'
        type='text'
        :rules="nRules['email']"
        :success="nRules['email'] && fields['email'] ? true : false"
        v-model="fields['email']"
      ></v-text-field>

      <v-text-field
        autocomplete="off"
        spellcheck="false"
        label='Password'
        name='password'
        prepend-icon='mdi-lock'
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        :rules="nRules['password']"
        :success="nRules['password'] && fields['password'] ? true : false"
        v-model="fields['password']"
      ></v-text-field>
      
      <v-checkbox
        v-model="fields['checkbox']"
        :rules="nRules['checkbox']"
        :success="nRules['checkbox'] && fields['checkbox'] ? true : false"
        label="Remember me?"
        required
      ></v-checkbox>
      
      <v-card-actions class="mb-2 pa-0">
        <router-link to="/password/restore" class="link--text text-decoration-none">
          Forget password?
        </router-link>
        <v-spacer></v-spacer>
        <v-btn @click="validate" color="link">Login</v-btn>
      </v-card-actions>
      <div>
        <span>
          Dont have an acccount?
        </span>
        <router-link to="/signup" class="link--text text-decoration-none">
          Register
        </router-link>
      </div>
    </v-form>
  </Auth>
</template>

<script>
import Auth from '@/layouts/Auth'
import rulesGenerate from '@/validation/rules'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  components: {
    Auth
  },
  data () {
    return {
      show: null,
      valid: null,
      fields: {
        checkbox: false,
        email: '',
        password: ''
      },
      rules: {
        email: 'required|email',
        password: 'required|min:8|max:1024',
        checkbox: 'required'
      }
    }
  },
  computed: {
    nRules: function () {
      return rulesGenerate(this.rules)
    }
  },
  methods: {
    ...mapActions('auth', {
      login: 'AUTH_LOGIN'
    }),
    async validate () {
      if (this.$refs.form.validate()) {
        const response = await this.login(this.fields)
        
        if (!response.success) {
          this.fields = response.fields
        }
      }
    },
  },
  created () {
    
  }
}
</script>

<style>
  
</style>
