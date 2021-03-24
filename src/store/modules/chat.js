import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    chat_list: null,
    search_chat_list: null,
    rooms_count: null,
    messages: null,
    messages_count: null
  },
  mutations: {
    SET_CHAT_LIST: (state, list) => {
      state.chat_list = list
    },
    SET_SEARCH_CHAT_LIST: (state, list) => {
      state.search_chat_list = list
    },
    SET_MESSAGES: (state, messages) => {
      state.messages = messages
      state.messages_count = Object.keys(messages).length
    },
    SET_MESSAGES_COUNT: (state, data) => {
      state.messages_count = data
    },
    APPEND_MESSAGE: (state, data) => {
      state.messages_count = Object.keys(data.messages).length
      // state.messages[state.messages_count - 1] = message.message
      state.messages = data.messages
    },
    APPEND_CHAT: (state, data) => {
      state.rooms_count = Object.keys(state.chat_list).length + 1
      state.chat_list[state.rooms_count - 1] = data.room
    }
  },
  getters: {
    GET_CHAT_LIST: (state) => {
      return state.chat_list
    },
    GET_SEARCH_CHAT_LIST: (state) => {
      return state.search_chat_list
    },
    GET_ROOMS_COUNT: (state) => {
      return state.rooms_count
    },
    GET_MESSAGES: (state) => {
      return state.messages
    },
    GET_MESSAGES_COUNT: (state) => {
      return state.messages_count
    }
  },
  actions: {
    CREATE_ROOM: async ({ commit, dispatch }, chat_data) => {
      const response = await Vue.axios.post('/api/rooms', chat_data, { validateStatus: () => true })
      const data = response.data
      
      let notification = {}

      if (data.success) {
        commit('APPEND_CHAT', {room: data.data})
        notification = {
          message: data.message,
          type: 'success'
        }
      } else {
        notification = {
          message: data.message,
          type: 'error'
        }
      }
      dispatch('notifications/SET_NOTIFICATION', notification, { root: true })
      
      return {success: data.success, fields: {}}
    },
    SET_CHAT_LIST: async ({ commit, dispatch }) => {
      const response = await Vue.axios.get('/api/rooms', { validateStatus: () => true })
      const data = response.data
      
      if (data.success) {
        commit('SET_CHAT_LIST', {...data.data})
      }
    },
    ADD_USER_TO_ROOM: async ({ commit, dispatch }, ur_data) => {
      const response = await Vue.axios.post('/api/room/user', ur_data, { validateStatus: () => true })
      const data = response.data
      
      if (data.success) {
        commit('SET_CHAT_LIST', {...data.data})
        dispatch('notifications/SET_NOTIFICATION', {message: data.message, type: 'success'}, { root: true })
      }
    },
    SET_SEARCH_CHAT_LIST: async ({ commit, dispatch }) => {
      const response = await Vue.axios.get('/api/rooms/all', { validateStatus: () => true })
      const data = response.data
      
      if (data.success) {
        commit('SET_SEARCH_CHAT_LIST', {...data.data})
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
    APPEND_MESSAGE: ({commit}, data) => {
      commit('APPEND_MESSAGE', data)
    },
    APPEND_CHAT: ({commit}, data) => {
      commit('APPEND_CHAT', data)
    },
    SEND_MESSAGE: async ({commit}, data) => {
      const response = await Vue.axios.post('/api/broadcast/messages', data, { validateStatus: () => true })
    }
  }
}
