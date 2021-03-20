import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    SET_PROFILE: (state, user) => {
      state.user = user
    }
  },
  getters: {
    GET_PROFILE: (state) => {
      return state.user
    }
  },
  actions: {
    SET_PROFILE: async ({ commit, dispatch }) => {
      commit('SET_PROFILE', null)
      if(Vue.axios.defaults.headers.common['Authorization']){
        const response = await Vue.axios.get('/api/user', { validateStatus: () => true })
        const data = response.data
        
        if (data.success) {
          commit('SET_PROFILE', {...data.data, logged: true})
          dispatch('REDIRECT', '/', { root: true })
        } else {
          commit('SET_PROFILE', {logged: false})
          dispatch('SET_SESSION_TOKEN', null, { root: true })
          dispatch('REDIRECT', '/login', { root: true })
        }
      } else {
        commit('SET_PROFILE', {logged: false})
        dispatch('REDIRECT', '/login', { root: true })
      }
    }
  }
}
