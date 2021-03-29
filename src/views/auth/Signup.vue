<template>
  <Auth title="Signup">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        class="my-2"
        hide-details
        autocomplete="off"
        spellcheck="false"
        label='Email'
        name='email'
        prepend-icon='mdi-email'
        type='text'
        v-model="fields['email']"
      ></v-text-field>

      <v-text-field
        class="my-2"
        hide-details
        autocomplete="off"
        spellcheck="false"
        label='Username'
        name='username'
        prepend-icon='mdi-account'
        type='text'
        v-model="fields.username"
      ></v-text-field>

      <v-text-field
        class="my-2"
        hide-details
        autocomplete="off"
        spellcheck="false"
        label='Password'
        name='password'
        prepend-icon='mdi-lock'
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        @click:append="show1 = !show1"
        v-model="fields.password"
      ></v-text-field>

      <v-text-field
        hide-details
        autocomplete="off"
        spellcheck="false"
        label='Repeat password'
        name='rePassword'
        prepend-icon='mdi-lock'
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show2 ? 'text' : 'password'"
        @click:append="show2 = !show2"
        v-model="fields.rePassword"
      ></v-text-field>

      <v-card-actions class="my-3 pa-0">
        <v-spacer></v-spacer>
        <v-btn 
          @click="submit" 
          color="link" 
          :disabled="disabled"
          width="100"
        >
          <div v-if="disabled">
            <v-progress-circular
              indeterminate
              :size="20"
              color="link"
            ></v-progress-circular>
          </div>
          <div v-else>
            Sign Up
          </div>
        </v-btn>
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
import { validate } from '@/validation'

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
      disabled: null,
      fields: {
        email: 'drdnrn7_1@gmail.com',
        username: 'drdnrn7_1',
        password: '123456789',
        rePassword: '123456789',
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
    ...mapActions('notifications', {
      setNotification: 'SET_NOTIFICATION'
    }),
    getFieldError(key){
      let temp = this.fields_error[key]
      this.fields_error[key] = undefined
      return temp
    },
    async submit () {
      const validation = validate(this.fields, this.rules)
      
      if(!validation.ok){
        this.setNotification({
          type: 'error',
          message: validation.error
        })
        return
      }
      
      this.disabled = true

      const res = await this.signup(this.fields)
        
      if (!res.ok) {
        this.disabled = false
        this.fields = res.fields
      }
    }
  },
  created () {
    
  }
}
</script>
