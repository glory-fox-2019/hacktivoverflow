import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: '',
    questions: [],
    answers: [],
    isLogin: false
  },
  mutations: {
    GETQUESTIONS(state, payload) {
      state.questions = payload
    },

    CHANGELOGIN(state, payload) {
      state.isLogin = payload
    },

    GETANSWERS(state, payload) {
      state.answers = payload
    },

    GETCURRENTUSER(state, payload) {
      state.currentUser = payload
    },
  },
  actions: {
    getQuestions(context, payload) {
      let token = localStorage.getItem('token')
      axios.get(`${url}/questions`, { headers: { token } })
        .then(({ data }) => {
          context.commit('GETQUESTIONS', data)
        })
        .catch(console.log)
    },

    getAnswers(context, payload) {
      let token = localStorage.getItem('token')
      axios.get(`${url}/answers/${payload}`, { headers: { token } })
        .then(({data}) => {
          context.commit('GETANSWERS', data)
        })
        .catch(console.log)
    }
  }
})
