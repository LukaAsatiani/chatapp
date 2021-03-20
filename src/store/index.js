import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import uiModules from '@/store/modules/ui'
import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import notifications from '@/store/modules/notifications'
import router from '../router'

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
    SET_SESSION_TOKEN: ({ commit }, token = null) => {
      if(!store._vm.$session.get('token'))
        store._vm.$session.set('token', token)
      
      if(token === null){
        store._vm.$session.remove('token')
        axios.defaults.headers.common['Authorization'] = null
      } else {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      }
    },
    REDIRECT ({state}, url) {
      if(url !== router.history.current.path)
        router.push(url)
    }
  }
})

export default store
