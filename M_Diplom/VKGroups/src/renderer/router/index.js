import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'auth',
      component: require('@/views/Auth').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/views/Home').default
    }
  ]
})
