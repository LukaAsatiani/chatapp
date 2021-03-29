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
  },
  actions: {
    SET_PROFILE: async ({ commit, dispatch }, data) => {
      commit('SET_PROFILE', data)
    }
  }
}
