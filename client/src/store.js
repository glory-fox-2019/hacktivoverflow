import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from './router';
// import router from './router';
// import swal from 'sweetalert2';

Vue.use(Vuex);
const baseUrl = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    isLogin: false,
    isOwner: false,
    questions: [],
    question: [],
    user: {},
  },
  mutations: {
    ISLOGIN(state, payload) {
      state.isLogin = payload;
    },
    LOGOUT(state, payload) {
      router.push('/');
      state.isLogin = payload;
      localStorage.clear();
    },
    LOGIN(state, payload) {
      state.isLogin = true;
      state.user = payload;
      localStorage.setItem('token', payload.token);
      localStorage.setItem('id', payload.id);
      localStorage.setItem('name', payload.name);
      router.push('/');
    },
    REGISTER(state, payload) {
      state.user = payload;
      router.push('/login');
    },
    CREATE_QUESTION(state, payload) {
      state.questions.unshift(payload);
      router.push('/');
    },
    SET_QUESTION(state, payload) {
      state.questions = payload;
    },
    GET_ONE_QUESTION(state, payload) {
      state.question = payload;
      // console.log(payload);
      // router.push('/detail');
    },
  },

  actions: {
    login(context, formLogin) {
      Axios.post(`${baseUrl}/api/user/login`, formLogin)
        .then(({ data }) => {
          context.commit('LOGIN', data);
        })
        .catch(console.log);
    },
    register(context, formRegister) {
      Axios.post(`${baseUrl}/api/user/register`, formRegister)
        .then(({ data }) => {
          context.commit('REGISTER', data);
        })
        .catch(console.log);
    },
    createQuestion(context, question) {
      const config = {
        headers: { token: localStorage.getItem('token') },
      };

      Axios.post(`${baseUrl}/api/question`, question, config)
        .then(({ data }) => {
          context.commit('CREATE_QUESTION', data);
        })
        .catch(console.log);
    },
    getQuestion(context) {
      Axios.get(`${baseUrl}/api/question`)
        .then(({ data }) => {
          context.commit('SET_QUESTION', data);
        })
        .catch(console.log);
    },
    getOneQuestion(context, questionId) {
      Axios
        .get(`${baseUrl}/api/question/${questionId}`)
        .then(({ data }) => {
          context.commit('GET_ONE_QUESTION', data);
        })
        .catch(console.log);
    },
  },
});
