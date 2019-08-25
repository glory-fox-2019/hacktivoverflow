import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueMoment from 'vue-moment';
 
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2);
Vue.use(VueMoment);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
