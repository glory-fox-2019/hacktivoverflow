import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import wysiwyg from "vue-wysiwyg";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faChevronUp, faChevronDown, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VoerroTagsInput from '@voerro/vue-tagsinput';

import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-wysiwyg/dist/vueWysiwyg.css';
import '@voerro/vue-tagsinput/dist/style.css';

library.add(faSearch, faChevronUp, faChevronDown, faEye, faGoogle, faTrash, faEdit );
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('tags-input', VoerroTagsInput);

Vue.use(BootstrapVue);
Vue.use(wysiwyg, {});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
