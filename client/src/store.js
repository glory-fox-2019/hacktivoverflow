import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    page: ''
  },
  mutations: {
    GETQUESTIONS(state, payload) {
      state.questions = payload
    }
  },
  actions: {
    getQuestions(context, payload) {
      let token = localStorage.getItem('token')
      axios.get(`${url}/questions`, {headers: {token}})
      .then(({data}) => {
        context.commit('GETQUESTIONS', data)
      })
      .catch(console.log)
    }
  }
})
