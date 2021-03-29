import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

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
import CreateRoom from './components/windows/CreateRoom'
import SearchRoom from './components/windows/SearchRoom'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.component('c-alert', Notifications)
Vue.component('c-dropdown', Dropdown)
Vue.component('c-drawer', Drawer)
Vue.component('c-chats-list', ChatsList)
Vue.component('c-chats-body', ChatBody)
Vue.component('c-create-room-window', CreateRoom)
Vue.component('c-search-room-window', SearchRoom)
Vue.component('default-layout', Default)
Vue.component('empty-layout', Empty)

new Vue({router, store, vuetify, render: (h) => h(App) }).$mount('#app')
