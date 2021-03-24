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
    },
    TEST2: () => {
      return 2
    },
  },
  actions: {
    SET_PROFILE: async ({ commit, dispatch }) => {
      commit('SET_PROFILE', null)
      if(Vue.axios.defaults.headers.common['Authorization']){
        const response = await Vue.axios.get('/api/user', { validateStatus: () => true })
        const data = response.data
        
        if (data.success) {
          commit('SET_PROFILE', {...data.data, logged: true})
        } else {
          commit('SET_PROFILE', {logged: false})
          dispatch('CLEAR_SESSION_TOKEN', {}, { root: true })
        }
      } else {
        commit('SET_PROFILE', {logged: false})
      }
    }
  }
}
