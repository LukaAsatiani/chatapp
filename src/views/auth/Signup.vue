<template>
  <Auth title="Signup">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
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
        label='Username'
        name='username'
        prepend-icon='mdi-account'
        type='text'
        :success="nRules['username'] && fields['username'] ? true : false"
        :rules="nRules.username"
        v-model="fields.username"
      ></v-text-field>

      <v-text-field
        autocomplete="off"
        spellcheck="false"
        label='Password'
        name='password'
        prepend-icon='mdi-lock'
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
        :success="nRules['password'] && fields['password'] ? true : false"
        :rules="nRules.password.concat((fields.password === fields.rePassword) || 'The password confirmation does not match.')"
        v-model="fields.password"
      ></v-text-field>

      <v-text-field
        autocomplete="off"
        spellcheck="false"
        label='Repeat password'
        name='rePassword'
        prepend-icon='mdi-lock'
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
        :success="nRules['rePassword'] && fields['rePassword'] ? true : false"
        :rules="nRules.rePassword.concat((fields.password === fields.rePassword) || 'The password confirmation does not match.')"
        v-model="fields.rePassword"
      ></v-text-field>

      <v-card-actions class="mb-2">
        <v-spacer></v-spacer>
        <v-btn @click="validate" color="link">Sign up</v-btn>
      </v-card-actions>
    </v-form>
    <div>
      <span>
        Already have an acccount?
      </span>
      <router-link to="/login" class="link--text text-decoration-none">
        Sign in
      </router-link>
    </div>
  </Auth>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Auth from '@/layouts/Auth'
import rulesGenerate from '@/validation/rules'

export default {
  name: 'Signup',
  components: {
    Auth
  },
  data () {
    return {
      show1: null,
      show2: null,
      valid: null,
      fields: {
        // email: 'drdnrn7_1@gmail.com',
        // username: 'drdnrn7_1@gmail.com',
        // password: 'drdnrn7_1@gmail.com',
        // rePassword: 'drdnrn7_1@gmail.com',
      },
      fields_error: {
      },
      rules: {
        email: 'required|email',
        username: 'required|min:8|max:32',
        password: 'required|min:8|max:1024',
        rePassword: 'required|min:8|max:1024'
      }
    }
  },
  computed: {
    nRules: function () {
      const rules = rulesGenerate(this.rules)
      
      for (let [key, value] of Object.entries(this.rules)){
        rules[key].unshift(
          (v) => this.fields_error[key] === undefined || this.getFieldError(key)
        )
      }
      
      return rules
    },
    passwordConfirmation () {
      return () => (this.fields.password === this.fields.rePassword) || 'Password must match'
    },
    ...mapGetters('user', {
      getProfile: 'GET_PROFILE'
    }),
  },
  methods: {
    ...mapActions('auth', {
      signup: 'AUTH_SIGNUP'
    }),
    getFieldError(key){
      let temp = this.fields_error[key]
      this.fields_error[key] = undefined
      return temp
    },
    async validate () {
      if (this.$refs.form.validate()) {
        const response = await this.signup({...this.fields, password_confirmation: this.fields.rePassword})
        
        if (!response.success) {
          this.fields = response.fields
          this.$refs.form.validate()
          this.fields_error = response.errors
        }
      }
    }
  },
  created () {
    
  }
}
</script>
