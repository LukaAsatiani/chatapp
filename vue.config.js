module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    'proxy': {
      '^/api': { 
        target: 'http://192.168.0.107:8000/', 
        changeOrigin: true, 
        secure:false, 
        pathRewrite: {'^/api': '/api'}, 
        logLevel: 'debug' 
      },
    }
  }
}
