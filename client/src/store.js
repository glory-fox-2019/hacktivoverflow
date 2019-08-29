import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
  },
  mutations: {
    SAVELOGIN(state) {
      state.isLogin = true;
    },
    CLEARLOGIN(state) {
      localStorage.clear();
      state.isLogin = false;
    },
    CHANGEQUESTION(state,payload){
      state.questions = payload
    }
  },
  actions: {
    alert(context, payload){
      Swal.fire({
        type: payload.type,
        title: payload.title
      })
    }
  },
});
