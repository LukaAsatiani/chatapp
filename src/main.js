import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Default from './layouts/Default'
import Empty from './layouts/Empty'
import Notifications from './components/Notifications'
import Dropdown from './components/Dropdown'
import Drawer from './components/Drawer'
import ChatsList from './components/ChatsList'
import ChatBody from './components/ChatBody'

Vue.use(VueAxios, axios)
Vue.use(VueSession, { persist: true })
Vue.config.productionTip = false

Vue.component('c-alert', Notifications)
Vue.component('c-dropdown', Dropdown)
Vue.component('c-drawer', Drawer)
Vue.component('c-chats-list', ChatsList)
Vue.component('c-chats-body', ChatBody)
Vue.component('default-layout', Default)
Vue.component('empty-layout', Empty)

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: process.env.VUE_APP_WEBSOCKETS_PORT,
  forceTLS: false,
  disableStats: true
});

new Vue({ router, store, vuetify, render: (h) => h(App) }).$mount('#app')
