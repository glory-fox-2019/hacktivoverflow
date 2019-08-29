import Vue from 'vue'
import Vuex from 'vuex'
import ax from '../src/apis/server'
import Toast from './helpers/swal'
import Swal from 'sweetalert2';
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: {},
    questions: [],
    question: {},
    questionsBelongs: [],
    answers: [],
    tags: [],
    dataReady: false,
    isLogin: false
  },
  getters: {
    isLogin: state => state.isLogin,
  },
  mutations: {
    setIsLogin(state, payload) {
      state.isLogin = payload
    },
    setUserData(state, payload) {
      state.userData = payload
      console.log(payload);
    },
    pushQuestion(state, payload) {
      state.questions.push(payload)
    },
    setQuestions(state, payload) {
      state.questions = payload
    },
    setQuestion(state, payload) {
      state.question = payload
      state.dataReady = true
    },
    pushAnswer(state, payload) {
      state.question.AnswerId.push(payload)
    },
    setQuestionsBelongsUser(state, payload) {
      state.questionsBelongs = payload
    },
    setDeleteQuestion(state, payload) {
      state.questions = state.questions.filter(el => el._id != payload)
    },
    setDeleteMyQuestion(state, payload) { 
      state.questionsBelongs = state.questionsBelongs.filter(el => el._id != payload)
    },
    setEditAnswer(state, payload) {
      state.question
    },
    setAnswer(state, payload) {
      state.answers = payload
    },
    pushAnswer(state, payload) {
      state.answers.push(payload)
    },
    setTag(state, payload) {
      state.tags = payload
    }
  },
  actions: {
    signUp({ commit }, payload) {
      ax.post('/users/signup', payload)
        .then(({ data }) => {
          Toast.fire({
            type: 'success',
            title: 'Sign up successfully',
          })
          setTimeout(() => { router.push('/login') }, 1500)
        })
        .catch(err => {
          Swal.fire({
            type:'error',
            title: `${err.response.data.err}`,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    signin({ commit }, payload) {
      ax.post('/users/signin', payload) 
        .then(({ data }) => {
          commit('setIsLogin', true)
          commit('setUserData', data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('id', data._id)
          setTimeout(() => { router.push('/') }, 1500)
          Toast.fire({
            type: 'success',
            title: `Welcome ${data.username}`,
          })
        })
        .catch(err => {
          Swal.fire({
            type:'error',
            title: `${err.response.data.err}`,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    signout({ commit, state }, payload) {
      setTimeout(() => { router.push('/') }, 1500)
      Toast.fire({
        type: 'success',
        title: `See ya ${state.userData.username}`,
      })
      commit('setIsLogin', false)
      commit('setUserData', {})
      localStorage.clear()
    },
    createQuestion({ commit }, payload) {
      ax.defaults.headers.common.token = localStorage.token
      ax.post('/questions', payload)
        .then(({ data }) => {
          commit('pushQuestion', data)
          setTimeout(() => { router.push('/') }, 1500)
          Toast.fire({
            type: 'success',
            title: `Successfully create question`,
          })
        })
        .catch(console.log)
    },
    getUserData({ commit }) {
      const { id } = localStorage
      ax.defaults.headers.common.token = localStorage.token;
      if (id) {
        ax.get(`users/${id}`)
          .then(({ data }) => {
            commit('setUserData', data);
            commit('setIsLogin', true)
          })
          .catch((err) => {
            if (err.response.data === 'jwt expired') {
              localStorage.clear();
              router.push('/');
            }
          });
      }
    },
    fetchQuestions({ commit }) {
      ax.get('/questions')
        .then(({ data }) => {
          commit('setQuestions', data)
        })
        .catch(console.log)
    },
    fetchQuestion({ commit }, payload) {
      ax.get(`/questions/${payload}`)
        .then(({ data }) => {
          commit('setQuestion', data)
          commit('setAnswer', data.AnswerId)
        })
        .catch(console.log)
    },
    createAnswer({ commit, dispatch }, payload) {
      console.log(payload);
      ax.post(`/answers`, payload)
        .then(({data}) => {
          dispatch('fetchQuestion', payload.QuestionId)
          Toast.fire({
            type: 'success',
            title: `Successfully create answer`,
          })
        })
        .catch(console.log)
    },
    editAnswer({ dispatch }, payload){
      console.log(payload);
      ax.defaults.headers.common.token = localStorage.token
      ax.patch(`/answers/${payload.answer.id}`, payload.answer) 
        .then(({ data }) => {
          dispatch('fetchQuestion', payload.question._id)
          Toast.fire({
            type: 'success',
            title: `Successfully update answer`,
          })
        })
        .catch(console.log)
    },
    deleteAnswer({ dispatch }, payload){
      console.log(payload);
      ax.defaults.headers.common.token = localStorage.token
      ax.delete(`/answers/${payload.answerId}`)
        .then(({ data }) => {
          dispatch('fetchQuestion', payload.question._id)
          Toast.fire({
            type: 'success',
            title: `Successfully delete answer`,
          })
        })
        .catch(console.log)
    },
    fetchQuestionsBelongs({ commit }, payload) {
      ax.defaults.headers.common.token = localStorage.token;
      ax.get(`/questions/findBelongs`)
        .then(({ data }) => {
          commit('setQuestionsBelongsUser', data)
        })
        .catch(console.log)
    },
    editQuestion({ dispatch }, payload){
      ax.defaults.headers.common.token = localStorage.token;
      ax.patch(`/questions/${payload._id}`, payload)
        .then(({ data }) => {
          dispatch('fetchQuestionsBelongs', payload._id)
          dispatch('fetchQuestions')
          setTimeout(() => { router.push('/') }, 1500)
          Toast.fire({
            type: 'success',
            title: `Successfully update question`,
          })
        })
        .catch(err => {
          Toast.fire({
            type: 'error',
            title: `${err.response.data.err}`,
          })
        })
    },
    deleteQuestion({ commit }, payload){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            ax.defaults.headers.common.token = localStorage.token;
            ax.delete(`/questions/${payload}`)
              .then(() => {
                commit('setDeleteQuestion', payload)
                commit('setDeleteMyQuestion', payload)
                Toast.fire({
                  type: 'success',
                  title: `Successfully delete question`,
                })
              })
          }
      })
        .catch(err => {
          Toast.fire({
            type: 'error',
            title: `${err.response.data.err}`,
          })
        })
    },
    upvoteQuestion({ dispatch }, payload){
      ax.defaults.headers.common.token = localStorage.token
      ax.patch(`/questions/vote/${payload.question._id}?type=upvote`)
        .then(({ data }) => {
          dispatch('fetchQuestion', payload.question._id)
        })
        .catch(err => {
          Toast.fire({
            type: 'error',
            title: `${err.response.data.err}`,
          })
        })
    },
    downvoteQuestion({ dispatch }, payload){
      ax.defaults.headers.common.token = localStorage.token
      ax.patch(`/questions/vote/${payload.question._id}?type=downvote`)
        .then(({ data }) => {
          dispatch('fetchQuestion', payload.question._id)
        })
        .catch(err => {
          Toast.fire({
            type: 'error',
            title: `${err.response.data.err}`,
          })
        })
    },
    upvoteAnswer({ dispatch, state }, payload){
      ax.defaults.headers.common.token = localStorage.token
      ax.patch(`/answers/vote/${payload.answer}?type=upvote`)
        .then(({ data }) => {
          dispatch('fetchQuestion', state.question._id)
        })
        .catch(err => {
          Toast.fire({
            type: 'error',
            title: `${err.response.data.err}`,
          })
        })
    },
    downvoteAnswer({ dispatch, state }, payload){
      ax.defaults.headers.common.token = localStorage.token
      ax.patch(`/answers/vote/${payload.answer}?type=downvote`)
        .then(({ data }) => {
          dispatch('fetchQuestion', state.question._id)
        })
        .catch(err => {
          Toast.fire({
            type: 'error',
            title: `${err.response.data.err}`,
          })
        })
    },
    filteringTag({ commit }, payload){
      ax.get(`/questions/tag/${payload}`)
        .then(({ data }) => {
          commit('setTag', data)
          router.push(`/filtertag/${payload}`)
        })
        .catch(console.log)
    }
  }
})
