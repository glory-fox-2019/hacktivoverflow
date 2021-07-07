import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VoerroTagsInput from '@voerro/vue-tagsinput'

Vue.use(BootstrapVue)
Vue.component('tags-input', VoerroTagsInput);

Vue.config.productionTip = false

import "@voerro/vue-tagsinput/dist/style.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
