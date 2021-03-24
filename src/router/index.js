import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    meta: {
      needAuth: true,
      guard: true
    },
    component: Main
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      needAuth: false,
      guard: true,
      layout: 'empty'
    },
    component: require('@/views/auth/Login.vue').default
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      needAuth: false,
      guard: true,
      layout: 'empty'
    },
    component: require('@/views/auth/Signup.vue').default
  },
  {
    path: '/404',
    name: '404',
    meta: { layout: 'empty' },
    component: require('@/views/errors/404.vue').default
  },
  {
    path: '*',
    beforeEnter(to, from, next) {
      next({name: '404'})
    }  
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// async function startSession(){
//   return await store.dispatch('START_SESSION')
// }

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.guard)) {
    store.dispatch('START_SESSION').then(() => {
      if(store.getters['user/GET_PROFILE'].logged){
        if(to.meta.needAuth){
          next()
        }
        else {
          next({name: 'main'})
        }
      }
      else {
        if(to.meta.needAuth){
          next({name: 'login'})
        }
        else {
          next()
        }
      }
    })
  } else {
    next()
  }
})

export default router
