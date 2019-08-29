import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/apis/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isSelectingAllQuestion: true,
    questions: [],
    question: {
      title: '',
      content: '',
      tags: '',
      userId: '',
      upVotes: [],
      downVotes: [],
    },
    user: {
      username: '',
      email: '',
      upvotedQuestion: [],
      downvotedQuestion: [],
      upvotedAnswer: [],
      downvotedAnswer: []
    }
  },
  mutations: {
    FETCH_ALL_QUESTIONS(state, payload) {
      state.questions = payload
    },
    LOGIN(state) {
      state.isLogin = true
    },
    SIGNOUT(state) {
      localStorage.clear()
      state.isLogin = false
      state.user = {
        username: '',
        email: '',
        upvotedQuestion: [],
        downvotedQuestion: [],
        upvotedAnswer: [],
        downvotedAnswer: []
      }
    },
    FETCH_ONE_QUESTION(state, payload) {
      state.question = payload
    },
    FETCH_LOGGED_USER(state, payload) {
      state.user = payload
    },
    TO_ALL_QUESTIONS(state) {
      state.isSelectingAllQuestion = true
    },
    TO_WATCHED_QUESTIONS(state) {
      state.isSelectingAllQuestion = false
    },
    SEARCH_QUESTIONS(state, payload) {
      state.questions = payload
      state.isSelectingAllQuestion = true
    }
  },
  actions: {
    // ================================ USERS
    signup({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `/users/signup`,
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.user.username)
            localStorage.setItem('email', data.user.email)
            commit('LOGIN')
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    signin({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/users/signin',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            // console.log(data, 'login user <<<<')
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.user.username)
            localStorage.setItem('email', data.user.email)
            commit('LOGIN')
            dispatch('fetchLoggedUser')
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    fetchLoggedUser({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/users`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            let storedUser = {
              username: data.username,
              email: data.email,
              upvotedQuestion: data.upvotedQuestion,
              downvotedQuestion: data.downvotedQuestion,
              upvotedAnswer: data.upvotedAnswer,
              downvotedAnswer: data.downvotedAnswer,
              watchedTags: data.watchedTags
            }
            commit('FETCH_LOGGED_USER', storedUser)
            resolve(storedUser)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    setWatchedTags({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `/users/watch-tag`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            tags: payload
          }
        })
          .then(({ data }) => {
            console.log(data)
            commit('TO_WATCHED_QUESTIONS')
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // =============================== QUESTION
    addQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `/questions`,
          data: {
            title: payload.title,
            content: payload.content,
            tags: payload.tags
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data, 'new questoin from store')
            resolve('fetched')
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    fetchAllQuestions({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/questions`
        })
          .then(({ data }) => {
            // console.log(data)
            commit('FETCH_ALL_QUESTIONS', data)
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    fetchOneQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/questions/${payload}`
        })
          .then(({ data }) => {
            // console.log(data, 'one question from vuex')
            commit('FETCH_ONE_QUESTION', data)
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    replyQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `/answers/${payload.questionId}`,
          data: {
            content: payload.answer.content
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            // console.log(data, 'new answer here from vuex <<<')
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    upvoteQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `/questions/upvote/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            // console.log(data, 'response from vuex upvote question')
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    downvoteQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `/questions/downvote/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            // console.log(data, 'response from vuex upvote question')
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    deleteQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `/questions/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve('successfuly deleting question')
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    updateQuestion({ commit }, payload) {
      // console.log(payload, 'form vuex')
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `/questions/${payload.questionId}`,
          data: payload.update,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data, 'updated question from vuex <<<<<<')
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    fetchWatchedQuestions({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        dispatch('fetchAllQuestions')
          .then(questions => {
            let filtered = questions.filter(function (quest) {
              return quest.tags.some(tag => payload.includes(tag._id))
            })

            commit('FETCH_ALL_QUESTIONS', filtered)
            resolve(filtered)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // =============================== ANSWER
    deleteAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `/answers/${payload.questionId}/${payload.answerId}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve('success delete answer')
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    updateAnswer({ dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `/answers/${payload.answerId}`,
          data: {
            content: payload.update.content
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    upvoteAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `/answers/upvote/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    downvoteAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `/answers/downvote/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
  }
})
