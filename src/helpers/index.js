import Vue from 'vue'

const gql = {
  query: async (str, variables = null) => {
    const d = await Vue.axios.post(
      '/graphql',
      {query: str, variables},
      {
        headers: {
          'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : null
        }
      }
    )
    
    return Object.values(d.data.data)[0]
  }
}

export { gql }