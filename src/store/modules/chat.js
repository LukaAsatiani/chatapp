import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    chat_list: null,
    messages: null,
    messages_count: null
  },
  mutations: {
    SET_CHAT_LIST: (state, list) => {
      state.chat_list = list
    },
    SET_MESSAGES: (state, messages) => {
      state.messages = messages
      state.messages_count = Object.keys(messages).length
    },
    SET_MESSAGES_COUNT: (state, data) => {
      state.messages_count = data
    },
    APPEND_MESSAGE: (state, message) => {
      state.messages[Object.keys(state.messages).length] = message.message
      if(state.messages_count)
        state.messages_count += 1
      else
        state.messages_count = 1
    }
  },
  getters: {
    GET_CHAT_LIST: (state) => {
      return state.chat_list
    },
    GET_MESSAGES: (state) => {
      return state.messages
    },
    GET_MESSAGES_COUNT: (state) => {
      return state.messages_count
    }
  },
  actions: {
    CREATE_CHAT: async ({ commit, dispatch }, chat_data) => {
      const response = await Vue.axios.post('/api/rooms', chat_data, { validateStatus: () => true })
      const data = response.data
      
      if (data.success) {
        commit('SET_CHAT_LIST', {...data.data})
      }
    },
    SET_CHAT_LIST: async ({ commit, dispatch }) => {
      const response = await Vue.axios.get('/api/rooms', { validateStatus: () => true })
      const data = response.data
      
      if (data.success) {
        commit('SET_CHAT_LIST', {...data.data})
      }
    },
    SET_MESSAGES: async ({ commit, dispatch }, room_id) => {
      const response = await Vue.axios.get(`/api/messages/${room_id}`, { validateStatus: () => true })
      const data = response.data
      
      if (data.success) {
        commit('SET_MESSAGES', {...data.data})
      }
    },
    SET_MESSAGES_COUNT: ({commit}, data = null) => {
      commit('SET_MESSAGES_COUNT', data)
    },
    APPEND_MESSAGE: ({commit}, message) => {
      commit('APPEND_MESSAGE', message)
    },
    SEND_MESSAGE: async ({commit}, data) => {
      const response = await Vue.axios.post('/api/broadcast/messages', data, { validateStatus: () => true })
    }
  }
}
