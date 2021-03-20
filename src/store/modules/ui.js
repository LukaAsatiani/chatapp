export default {
  namespaced: true,
  state: {
    drawer: null
  },
  mutations: {
    DRAWER_TOGGLER (state) {
      state.drawer = !state.drawer
    }
  },
  getters: {
    GET_DRAWER (state) {
      return state.drawer
    }
  },
  actions: {
    DRAWER_TOGGLER ({ commit }) {
      commit('DRAWER_TOGGLER')
    }
  }
}
