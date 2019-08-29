import Vue from 'vue'
import Vuex from 'vuex'
import backend from './api/backend'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !!localStorage.getItem('accesstoken'),
    email: localStorage.getItem('email'),
    questions: [],
    question: {},
    answer: {},
    myTags: []
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setEmail (state, payload) {
      state.email = payload
    },
    storeAllQ (state, payload) {
      state.questions = payload
    },
    storeQ (state, payload) {
      state.question = payload
    },
    storeA (state, payload) {
      state.answer = payload
    },
    storeTag (state, payload) {
      state.myTags = payload
    },
    pushNewQ (state, payload) {
      state.questions.unshift(payload)
    }
  },
  actions: {
    getAllQ (context) {
      backend
        .get('/questions')
        .then(({ data }) => {
          context.commit('storeAllQ', data)
        })
        .catch(err => {
          context.dispatch('displayErr', err)
        })
    },
    filterQ (context, route) {
      backend
        .get(route)
        .then(({ data }) => {
          context.commit('storeAllQ', data)
        })
        .catch(err => {
          context.dispatch('displayErr', err)
        })
    },
    getQ (context, id) {
      backend
        .get('/questions/' + id)
        .then(({ data }) => {
          context.commit('storeQ', data)
        })
        .catch(err => {
          context.dispatch('displayErr', err)
        })
    },
    submitQ (context, obj) {
      backend
        .post('/questions', obj, {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(({ data }) => {
          context.commit('pushNewQ', data)
          context.dispatch('getAllQ')
        })
        .catch(err => {
          context.dispatch('displayErr', err)
        })
    },
    updateQ (context, obj) {
      backend
        .patch('/questions/' + context.state.question._id, obj, {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(() => {
          context.dispatch('getAllQ')
        })
        .catch(err => {
          context.dispatch('displayErr', err)
        })
    },
    removeQ (context) {
      backend
        .delete('/questions/' + context.state.question._id, {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(() => {
          context.dispatch('getAllQ')
        })
        .catch(err => {
          context.dispatch('displayErr', err)
        })
    },
    getMyTag (context) {
      backend
        .get('/tag', {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(({ data }) => {
          context.commit('storeTag', data.watch_tag)
        })
        .catch(err => {
          context.dispatch('displayErr', err)
        })
    },
    displayErr (context, err) {
      if (err.response) {
        swal(err.response.data)
      } else {
        console.log(err)
      }
    }
  }
})
