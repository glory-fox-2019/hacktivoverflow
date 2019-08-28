import Vue from 'vue'
import Vuex from 'vuex'
import ax from '@/config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: {},
    user: {}
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_QUESTIONS (state, payload) {
      state.questions = payload
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    },
    LOGOUT (state) {
      state.isLogin = false
    },
    UPDATE_VOTE (state, payload) {
      let voteState
      if (payload.type === 'question') {
        voteState = state.question
      } else if (payload.type === 'answer') {
        let index = state.question.answers.findIndex(el => el._id === payload.idanswer)
        voteState = state.question.answers[index]
      }

      if (payload.voteType === 'upvote') {
        voteState.downvotes = voteState.downvotes.filter(el => el !== payload.iduser)
        voteState.upvotes.push(payload.iduser)
      } else if (payload.voteType === 'downvote') {
        voteState.upvotes = voteState.upvotes.filter(el => el !== payload.iduser)
        voteState.downvotes.push(payload.iduser)
      } else if (payload.voteType === 'netralvote') {
        voteState.upvotes = voteState.upvotes.filter(el => el !== payload.iduser)
        voteState.downvotes = voteState.downvotes.filter(el => el !== payload.iduser)
      }
    },
    ADD_COMMENT (state, payload) {
      let commentState
      if (payload.type === 'question') {
        commentState = state.question.comments
      } else if (payload.type === 'answer') {
        let index = state.question.answers.findIndex(el => el._id === payload.idanswer)
        commentState = state.question.answers[index].comments
      }
      commentState.push(payload.data)
    }
  },
  actions: {
    fetchQuestion ({ commit, state }, id) {
      ax({
        url: '/question/' + id
      })
        .then(({ data }) => {
          commit('SET_QUESTION', data)
        })
        .catch(({ response }) => {
          this.$swal({
            type: 'error',
            title: 'Error!',
            text: response.data.error
          })
        })
    },
    fetchQuestions ({ commit, state }) {
      ax({
        url: '/question'
      })
        .then(({ data }) => {
          commit('SET_QUESTIONS', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    checkLogin ({ commit, state }) {
      if (localStorage.getItem('access_token')) {
        ax({
          url: '/user/'
        })
          .then(({ data }) => {
            state.user = data
            state.isLogin = true
          })
          .catch(({ response }) => {
            console.log(response)
          })
      }
    }
  }
})
