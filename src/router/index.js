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

router.beforeEach( async (to, from, next) => {
  // store.dispatch('auth/AUTH_LOGIN')

  if (to.matched.some(record => record.meta.guard)) {
    const check = async () => {
      if(!localStorage.token)
        return false
      
      return await store.dispatch('START_SESSION')
    }

    const logged = await check()
    
    if (logged && !to.meta.needAuth)
      next({name: 'main'})
    
    if (!logged && to.meta.needAuth)
      next({name: 'login'})
    
    next()
  }
    
  next()
})

export default router
