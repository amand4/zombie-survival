import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'
import RegisterInfection from '@/components/ResgisterInfection.vue'
import Reports from '@/components/Reports.vue'



export default [
    {
      name:'home',
      path: '',
      component: Home
    },
    {
      name:'register',
      path:'/register',
      component: Register
    },
    {
      name:'registerInfection',
      path:'/:id/register-infection',
      component: RegisterInfection,
    },
    {
      name:'reports',
      path:'/reports',
      component: Reports,
    }, 

  ]

