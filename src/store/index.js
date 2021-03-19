import Vue from 'vue'
import Vuex from 'vuex'

import uiModules from '@/store/modules/ui'
import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import notifications from '@/store/modules/notifications'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    ui: uiModules,
    auth,
    notifications,
    user
  },
  actions: {
    SET_SESSION_TOKEN: ({ commit }, token) => {
      store._vm.$session.set('token', token)
      commit('auth/SET_TOKEN', token)
    }
  }
})

export default store
