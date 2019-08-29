import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import axios from './api/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [{
      owner: {},
      answer: [],
      upvotes: [],
      downvotes: [],
    }],
  },
  mutations: {
    SAVELOGIN(state) {
      state.isLogin = true;
    },
    CLEARLOGIN(state) {
      localStorage.clear();
      state.isLogin = false;
    },
    CHANGEQUESTION(state, payload) {
      state.questions = payload;
    },
    UPDATEVOTEQUESTION(state, payload) {
      for (let i=0; i<state.questions.length; i++){
        if (state.questions[i]._id === payload._id){
          state.questions[i].upvotes = payload.upvotes;
          state.questions[i].downvotes = payload.downvotes;
        }
      }
    },
  },
  actions: {
    alert(context, payload) {
      Swal.fire({
        type: payload.type,
        title: payload.title,
      });
    },
    getQuestions(context, payload) {
      Swal.showLoading();
      axios({
        url: '/question/find',
        method: 'get',
      })
        .then(({ data }) => {
          Swal.close();
          context.commit('CHANGEQUESTION', data);
          this.questions = data;
        })
        .catch((err) => {
          context.dispatch('alert', { type: 'error', title: 'Network Confused' });
        });
    },
    getMyCollection(context, payload) {
      Swal.showLoading();
      axios({
        url: '/question/find/collection',
        method: 'get',
        headers: { token: payload },
      })
        .then(({ data }) => {
          Swal.close();
          context.commit('CHANGEQUESTION', data);
        })
        .catch((err) => {
          context.dispatch('alert', { type: 'error', title: 'Network Confused' });
          console.log(err);
        });
    },
  },
});
