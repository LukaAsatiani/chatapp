import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: require('@/views/auth/Login.vue').default
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: { layout: 'empty' },
    component: require('@/views/auth/Signup.vue').default
  },
  {
    path: '*',
    name: '404',
    component: require('@/views/errors/404.vue').default
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
