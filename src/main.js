import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import routes from './routes'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

Vue.config.productionTip = false

var router = new VueRouter({
  routes: routes,
  mode: 'history'
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
