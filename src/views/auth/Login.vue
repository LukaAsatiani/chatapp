<template>
  <Auth title="Authorization">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="px-3"
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
        hide-details
        autocomplete="off"
        spellcheck="false"
        label='Password'
        name='password'
        prepend-icon='mdi-lock'
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        v-model="fields['password']"
      ></v-text-field>
      
      <v-card-actions class="my-3 pa-0">
        <router-link to="/password/restore" class="link--text text-decoration-none">
          Forget password?
        </router-link>
        <v-spacer></v-spacer>
        <v-btn 
          @click="submit" color="link" 
          :disabled="disabled"
          width = "100"
        >
          <div v-if="disabled">
            <v-progress-circular
              indeterminate
              :size="20"
              color="link"
            ></v-progress-circular>
          </div>
          <div v-else>
            Login
          </div>
        </v-btn>
      </v-card-actions>
      <div>
        <span>
          Don't have an acccount?
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
import { mapActions, mapGetters } from 'vuex'
import { validate } from '@/validation'

export default {
  name: 'Login',
  components: {
    Auth
  },
  data () {
    return {
      show: null,
      valid: null,
      disabled: null,
      fields: {
        email: 'Drainkoron2@gmail.com',
        password: '1234567890'
      },
      rules: {
        email: 'required|email',
        password: 'required|min:8|max:1024',
      }
    }
  },
  methods: {
    ...mapActions('auth', {
      login: 'AUTH_LOGIN'
    }),
    ...mapActions('notifications', {
      setNotification: 'SET_NOTIFICATION'
    }),
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
      const res = await this.login(this.fields)
        
      if (!res.ok) {
        this.fields = res.fields
        this.disabled = false
      }
    },
  },
  created () {
    
  }
}
</script>

<style>
  
</style>
