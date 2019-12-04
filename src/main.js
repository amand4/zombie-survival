import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import routes from './routes'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps)
Vue.config.productionTip = false


// var load  = new VueGoogleMaps({
//   key: 'AIzaSyCWWS79VVepskOuduqJPZzgUTb46xzqMqQ',
// })


var router = new VueRouter({
  routes: routes,
  mode: 'history'
})


new Vue({
  render: h => h(App),
  router,
  
}).$mount('#app')
