import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Swal from 'sweetalert2';
import router from './router';

Vue.use(Vuex);
const baseUrl = 'http://18.140.59.143';

export default new Vuex.Store({
  state: {
    isLogin: false,
    isOwner: false,
    questions: [],
    question: [],
    newQuestion: [],
    myQuestion: [],
    answers: [],
    answer: [],
    user: {},
  },
  mutations: {
    ISLOGIN(state, payload) {
      state.isLogin = payload;
    },
    LOGOUT(state, payload) {
      localStorage.clear();
      Swal.fire(
        'logout success!',
        'success',
      );
      router.push('/');
      state.isLogin = payload;
    },
    LOGIN(state, payload) {
      state.isLogin = true;
      state.user = payload;
      localStorage.setItem('token', payload.token);
      localStorage.setItem('id', payload.id);
      localStorage.setItem('name', payload.name);
      Swal.fire(
        'login success!',
        'success',
      );
      router.push('/');
    },
    REGISTER(state, payload) {
      state.user = payload;
      router.push('/login');
    },
    CREATE_QUESTION(state, payload) {
      state.questions.unshift(payload);
      Swal.fire(
        'Create Question success!',
        'success',
      );
      router.push('/');
    },
    SET_QUESTION(state, payload) {
      state.questions = payload;
    },
    GET_ONE_QUESTION(state, payload) {
      state.question = payload;
    },
    CREATE_ANSWER(state, payload) {
      state.answers.push(payload);
    },
    GET_ANSWER(state, payload) {
      state.answer = payload;
    },
    MY_QUESTION(state, payload) {
      state.myQuestion = payload;
      // console.log(this.state.myQuestion, 'kedip');
    },
    REMOVE_QUESTION(state, payload) {
      state.questions = state.questions.filter(question => question.id === payload);
      Swal.fire(
        'Remove Question success!',
        'success',
      );
    },
    REMOVE_ANSWER(state, payload) {
      state.answers = state.answers.filter(answer => answer.id === payload);
      Swal.fire(
        'Remove Answer success!',
        'success',
      );
    },
    UPDATE_QUESTION(state, payload) {
      state.newQuestion = payload;
    },
    // UPVOTE_QUESTION(stat)
  },

  actions: {
    login(context, formLogin) {
      Axios.post(`${baseUrl}/api/user/login`, formLogin)
        .then(({ data }) => {
          context.commit('LOGIN', data);
        })
        .catch(console.log(err.respons));
    },
    register(context, formRegister) {
      Axios.post(`${baseUrl}/api/user/register`, formRegister)
        .then(({ data }) => {
          context.commit('REGISTER', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    createQuestion(context, question) {
      const config = {
        headers: { token: localStorage.getItem('token') },
      };

      Axios.post(`${baseUrl}/api/question`, question, config)
        .then(({ data }) => {
          context.commit('CREATE_QUESTION', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    getQuestion(context) {
      Axios.get(`${baseUrl}/api/question`)
        .then(({ data }) => {
          context.commit('SET_QUESTION', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    getOneQuestion(context, questionId) {
      Axios
        .get(`${baseUrl}/api/question/${questionId}`)
        .then(({ data }) => {
          context.commit('GET_ONE_QUESTION', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    myQuestion(context, userId) {
      // console.log('masuk store', userId);
      Axios
        .get(`${baseUrl}/api/question/owner/${userId}`)
        .then(({ data }) => {
          context.commit('MY_QUESTION', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    createAnswer(context, answer) {
      const config = {
        headers: { token: localStorage.getItem('token') },
      };
      Axios
        .post(`${baseUrl}/api/answer`, answer, config)
        .then(({ data }) => {
          console.log(data);
          context.commit('CREATE_ANSWER', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    getAnswer(context, questionId) {
      Axios
        .get(`${baseUrl}/api/answer/${questionId}`)
        .then(({ data }) => {
          context.commit('GET_ANSWER', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    removeQuestion(contex, questionId) {
      const config = {
        headers: { token: localStorage.getItem('token') },
      };
      Axios
        .delete(`${baseUrl}/api/question/${questionId}`, config)
        .then(({ data }) => {
          contex.commit('REMOVE_QUESTION', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    removeAnswer(context, answerId) {
      Axios
        .delete(`${baseUrl}/api/answer/${answerId}`)
        .then(({ data }) => {
          context.commit('REMOVE_QUESTION', data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    submitUpdateQuestion(context, newQuestion) {
      const config = {
        headers: { token: localStorage.getItem('token') },
      };
      Axios
        .patch(`${baseUrl}/api/question/${newQuestion.id}`, newQuestion, config)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    submitUpdateAnswer(context, newAnswer) {
      const config = {
        headers: { token: localStorage.getItem('token') },
      };
      Axios
        .patch(`${baseUrl}/api/answer/${newAnswer.id}`, newAnswer, config)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.respons);
        });
    },
    upvoteQuestion(context, questionId) {
      Axios({
        method: 'patch',
        url: `${baseUrl}/api/question/vote/${questionId}?type=upvote`,
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          context.dispatch('getQuestion', questionId);
        })
        .catch((err) => {
          console.log(err.respons);
        })
    },
    downvoteQuestion(context, questionId) {
      Axios({
        method: 'patch',
        url: `${baseUrl}/api/question/vote/${questionId}?type=downvote`,
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          context.dispatch('getQuestion', questionId);
        })
        .catch((err) => {
          console.log(err.respons);
        })
    },
    downvoteAnswer(context, answerId) {
      Axios({
        method: 'patch',
        url: `${baseUrl}/api/answer/vote/${answerId}?type=upvote`,
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          context.dispatch('getAnswer', answerId);
        })
        .catch((err) => {
          console.log(err.respons);
        })
    },
    upvoteAnswer(context, answerId) {
      Axios({
        method: 'patch',
        url: `${baseUrl}/api/answer/vote/${answerId}?type=downvote`,
        headers: {
          token: localStorage.token,
        },
      })
        .then(() => {
          context.dispatch('getAnswer', answerId);
        })
        .catch((err) => {
          console.log(err.respons);
        })
    },
  },
});
