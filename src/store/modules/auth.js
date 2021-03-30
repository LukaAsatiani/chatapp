import Vue from 'vue'
import { gql } from '@/helpers/index'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    AUTH_LOGIN: async ({dispatch}, fields) => {
      const res = await gql.query(`
        query ($email: String!, $password: String!) {
          login (email: $email, password: $password) 
            { ok token { value user_id } message }}`,
        {
          email: fields.email,
          password: fields.password
        }
      )
      
      if( res.ok ){
        dispatch('SET_TOKEN', res.token.value, { root: true })
        await dispatch('START_SESSION', {}, { root: true })
        dispatch('REDIRECT', '/', { root: true })
        return res
      }

      dispatch('notifications/SET_NOTIFICATION', 
        {
          message: res.message,
          type: 'error'
        },
        { root: true })

      return {ok: res.ok, fields: {
        email: fields.email
      }}
    },
    
    AUTH_SIGNUP: async ({ dispatch }, fields) => {
      const res = await gql.query(`
        mutation ($email: String!, $username: String!, $password: String!) 
          { createUser(fields: {email: $email, username: $username, password: $password})
            { ok token { value } errors { path validatorKey } message}}`,
        {
          email: fields.email,
          username: fields.username,
          password: fields.password
        }
      )
      
      if( res.ok ){
        dispatch('SET_TOKEN', res.token.value, { root: true })
        await dispatch('START_SESSION', {}, { root: true })
        return res
      }

      let msg = `${res.errors[0]['path']}.${res.errors[0]['validatorKey']}` || res.message
      
      dispatch('notifications/SET_NOTIFICATION', 
        {
          message: msg,
          type: 'error'
        },
        { root: true })

      return {
        ...res,
        fields: {
          email: fields.email
        }
      }
    },

    AUTH_LOGOUT: async ({ dispatch }) => {
      const res = await gql.query(`
        mutation {
          logout {
            ok
            message
          }
        }
      `)

      if( res.ok ){
        dispatch('user/SET_PROFILE', null, { root: true })
        dispatch('SET_TOKEN', null, { root: true })
        dispatch('REDIRECT', '/login', { root: true })
      }
    }
  }
}
