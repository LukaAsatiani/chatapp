import Vue from 'vue'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    AUTH_LOGIN: async ({ dispatch }, fields) => {
      const response = await Vue.axios.post('/api/login', fields, { validateStatus: () => true })
      const data = response.data

      let notification = {}
      
      if (data.success) {
        const token = data.data.token
        
        notification = {
          message: data.message,
          type: 'success'
        }
        
        dispatch('SET_SESSION_TOKEN', token, { root: true })
        dispatch('user/SET_PROFILE', {}, { root: true })
      } else {
        notification = {
          message: data.message,
          type: 'error'
        }
      }

      dispatch('notifications/SET_NOTIFICATION', notification, { root: true })
      return {success: data.success, fields: {email: fields.email}}
    },
    
    AUTH_SIGNUP: async ({ dispatch }, fields) => {
      const response = await Vue.axios.post('/api/signup', fields, { validateStatus: () => true })
      const data = response.data

      const filterWithErrors = (array1, array2) => {
        const array = []
        for (let [key, value] of Object.entries(array1)){
          if(array2[key] === undefined)
            array[key] = value
        }
        return array
      }

      let notification = {}
      let res = {}
      let fieldsToReturn = {
        email: fields.email,
        username: fields.username
      }
      
      if (data.success) {
        notification = {
          message: data.message,
          type: 'success'
        }
        res = {
          fields: fieldsToReturn
        }
        
        dispatch('REDIRECT', '/login', { root: true })
      } else {
        notification = {
          message: data.message,
          type: 'error'
        }
        res = {
          errors: data.errors,
          fields: filterWithErrors(
            fieldsToReturn,
            data.errors
          )
        }
      }
      
      dispatch('notifications/SET_NOTIFICATION', notification, { root: true })
      return {
        success: data.success,
        ...res
      }
    },

    AUTH_LOGOUT: async ({ dispatch }) => {
      const response = await Vue.axios.get('/api/logout')
      const data = response.data
      
      const notification = {
        message: data.message,
        type: 'success'
      }

      dispatch('SET_SESSION_TOKEN', null, { root: true })
      dispatch('user/SET_PROFILE', {}, { root: true })
      dispatch('notifications/SET_NOTIFICATION', notification, { root: true })
    },
  }
}
