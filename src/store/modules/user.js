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
    SET_PROFILE: async ({ commit, rootState, dispatch }, param = null) => {
      commit('SET_PROFILE', null)
      if(param){
        commit('SET_PROFILE', param)
        return
      }
      
      let token = rootState.auth.token
      const headers = {
        Authorization: 'Bearer ' + token
      }
      
      const response = await Vue.axios.get('/api/profile', { validateStatus: () => true, headers })
      const data = response.data
      
      if (data.success) {
        commit('SET_PROFILE', {...data.data, logged: true})
      } else {
        dispatch('SET_SESSION_TOKEN', null, { root: true })
      }
    }
  }
}
