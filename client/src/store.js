import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)
const baseUrl = 'http://localhost:3000/api'
export default new Vuex.Store({
  state: {
    questions: [],
    myquestions: [],
    isLogin: false,
    oneQuestion: null,
    answers: []

  },
  mutations: {
    SET_DATA (state, payload) {
      state.questions = payload
    },
    CHANGE_LOGIN_STATUS (state, payload) {
      state.isLogin = payload
    },
    SET_DATA_MINE (state, payload) {
      state.myquestions = payload
    },
    SET_ONE_QUESTION (state, payload) {
      state.oneQuestion = payload
    }

  },
  actions: {
    fetch_question (context) {
      axios.get(baseUrl + '/questions')
        .then(({ data }) => {
          context.commit('SET_DATA', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    login (context, payload) {
      axios.post(baseUrl + '/users/login', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('UserId', data._id)
          context.commit('CHANGE_LOGIN_STATUS', true)
          Swal.fire({
            type: 'success',
            title: 'Login Success!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: 'error',
            title: 'Invalid Username/Password!',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    register (context, payload) {
      axios.post(baseUrl + '/users/register', {
        email: payload.email,
        password: payload.password,
        name: payload.name
      })
        .then(({ data }) => {
          console.log(data)
          Swal.fire({
            type: 'success',
            title: `Register Success!
             Please, login first.`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: 'error',
            title: `Invalid User Validation!`,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    createQuestion (context, payload) {
      axios.post(baseUrl + '/questions',
        payload,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: `New question is created!`,
            showConfirmButton: false,
            timer: 1500
          })
          console.log(data)
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: `Internal Server Error!`,
            showConfirmButton: false,
            timer: 1500
          })
          console.log(err)
        })
    },
    fetch_myquestion (context) {
      axios.get(baseUrl + '/questions/list/myquestion',
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )
        .then(({ data }) => {
          context.commit('SET_DATA_MINE', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    findOneQuestion (context, payload) {
      axios.get(baseUrl + '/questions/' + payload)
        .then(({ data }) => {
          context.commit('SET_ONE_QUESTION', data)
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion (context, payload) {
      axios.delete(baseUrl + '/questions/' + payload,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetch_question')
          context.dispatch('fetch_myquestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editQuestion (context, payload) {
      axios.patch(baseUrl + '/questions/' + payload.id, payload.data,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: `Question is updated!`,
            showConfirmButton: false,
            timer: 1500
          })
          console.log(data)
          context.dispatch('fetch_question')
          context.dispatch('fetch_myquestion')
        })
        .catch(err => {
          console.log(err)
        })
    },
    createAnswer (context, payload) {
      axios.post(baseUrl + '/answers',
        payload,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      )
        .then(({ data }) => {
          axios.get(baseUrl + '/answers/all/' + payload.QuestionId)
            .then(({ data }) => {
              context.state.answers = data
              console.log(data)
            })
            .catch(err => {
              console.log(err)
            })
          Swal.fire({
            type: 'success',
            title: `New answer is created!`,
            showConfirmButton: false,
            timer: 1500
          })
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    upvotesQuestion (context, payload) {
      axios.patch(baseUrl + '/questions/upvotes/' + payload, null, { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetch_question')
          context.dispatch('fetch_myquestion')
          context.dispatch('findOneQuestion', payload)
          Swal.fire({
            type: 'success',
            title: `You have been giving upvotes to this post!`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: 'error',
            title: `You can only give one vote!`,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    downvotesQuestion (context, payload) {
      axios.patch(baseUrl + '/questions/downvotes/' + payload, null, { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          console.log(data)
          context.dispatch('fetch_question')
          context.dispatch('fetch_myquestion')
          context.dispatch('findOneQuestion', payload)
          Swal.fire({
            type: 'success',
            title: `You have been giving downvotes to this post!`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: 'error',
            title: `You can only give one vote!`,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    editAnswer (context, payload) {
      axios.patch(baseUrl + '/answers/' + payload.id, payload.data,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log(data)
          Swal.fire({
            type: 'success',
            title: `Your answer has been updated!`,
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('fetch_question')
          context.dispatch('fetch_myquestion')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
