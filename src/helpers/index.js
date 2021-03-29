import Vue from 'vue'

const gql = {
  query: async (str, variables = null) => {
    const d = await Vue.axios.post(
      '/graphql',
      {query: `query ${str}`, variables},
      {
        headers: {
          'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : null
        }
      }
    )
    
    return Object.values(d.data.data)[0]
  },
  mutation: async (str, variables = null) => {
    const d = await Vue.axios.post(
      '/graphql',
      {query: `mutation ${str}`, variables},
      {
        headers: {
          'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : null
        }
      }
    )

    return Object.values(d.data.data)[0]
  },
}

export { gql }