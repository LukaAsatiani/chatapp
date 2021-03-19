import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1E1E1E',
        secondary: '#2a9d8f',
        accent: '#e76f51',
        link: '#2196fc'
      }
    }
  }
})
