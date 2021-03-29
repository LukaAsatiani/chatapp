module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    'proxy': {
      '^/graphql': { 
        target: 'http://localhost:3000', 
        changeOrigin: true, 
        secure:false, 
        pathRewrite: {'^/graphql': '/graphql'},
        logLevel: 'debug' 
      },
    }
  }
}
