import Vue from 'vue';
import Vuex from 'vuex';

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
      
  },
});
