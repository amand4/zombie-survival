import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'


Vue.use(Router)


  const routes = [
    {
      name:'home',
      path: '/',
      components: Home
    }
  ]
  const router = new Router({routes})

  export default router
