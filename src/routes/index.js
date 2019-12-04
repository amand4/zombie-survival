import HelloWorld from '@/components/HelloWorld.vue'
import Home from '@/views/Home.vue'


export default [
    {
      name:'hello',
      path: '',
      component: HelloWorld
    },
    {
        name:'register',
        path:'/register',
        component: Home
    }
  ]

