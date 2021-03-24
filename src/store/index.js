import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import uiModules from '@/store/modules/ui'
import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import notifications from '@/store/modules/notifications'
import chat from '@/store/modules/chat'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    ui: uiModules,
    auth,
    notifications,
    user,
    chat
  },
  actions: {
    SET_SESSION_TOKEN: ({ commit }, token = null) => {
      if(token)
        store._vm.$session.set('token', token)
      
      if(store._vm.$session.get('token'))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + store._vm.$session.get('token')
    },
    CLEAR_SESSION_TOKEN: () => {
      store._vm.$session.remove('token')
      axios.defaults.headers.common['Authorization'] = null
    },
    START_SESSION: async ({ dispatch }) => {
      if(!store._vm.$session.exists()){
        store._vm.$session.start()
      }
  
      dispatch('SET_SESSION_TOKEN', null, { root: true })
      await dispatch('user/SET_PROFILE', null, { root: true })
      return
    },
    REDIRECT: ({state}, url) => {
      if(url !== router.history.current.path)
        router.push(url)
    }
  },
  getters: {
    TEST: (state) => {
      return 1
    }
  }
})

export default store
