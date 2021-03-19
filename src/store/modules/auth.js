import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  getters: {
    GET_TOKEN: (state) => {
      return state.token
    }
  },
  actions: {
    AUTH_LOGIN: async ({ dispatch }, fields) => {
      const response = await Vue.axios.post('/api/login', fields, { validateStatus: () => true })
      const data = response.data

      let notification = {}
      
      if (data.success) {
        notification = {
          message: data.message,
          type: 'success'
        }

        dispatch('SET_SESSION_TOKEN', data.token, { root: true })
        dispatch('user/SET_PROFILE', null, { root: true })
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
    SET_TOKEN: ({commit}, token) => {
      commit('SET_TOKEN', token)
    }
  }
}
