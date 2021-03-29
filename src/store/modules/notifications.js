export default {
  namespaced: true,
  state: {
    notification: {}
  },
  mutations: {
    SET_NOTIFICATION: (state, notification) => {
      state.notification = notification
    },
    REMOVE_NOTIFICATION: (state) => {
      state.notification = {}
    }
  },
  getters: {
    GET_NOTIFICATION: (state) => {
      return state.notification
    }
  },
  actions: {
    SET_NOTIFICATION: ({ commit }, notification) => {
      notification.show = true
      commit('SET_NOTIFICATION', notification)
    },
    REMOVE_NOTIFICATION: ({ commit }) => {
      commit('REMOVE_NOTIFICATION')
    }
  }
}