import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from 'vue-wysiwyg'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(axios)
Vue.use(wysiwyg)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
