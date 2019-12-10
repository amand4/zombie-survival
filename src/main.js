import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import routes from './routes'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import VModal from 'vue-js-modal'

Vue.use(Chartkick.use(Chart)) 
Vue.use(BootstrapVue)
Vue.use(VModal)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: { 
    key: 'AIzaSyCWWS79VVepskOuduqJPZzgUTb46xzqMqQ', 
    libraries: 'places'
  }
})
Vue.config.productionTip = false

var router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router,  
}).$mount('#app')
