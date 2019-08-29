import Vue from 'vue'
import Vuex from 'vuex'
import ax from '@/config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: {},
    user: {},
    myQuestion: [],
    search: {
      questions: [],
      input: ''
    }
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
    },
    DELETE_COMMENT (state, payload) {
      let commentState
      if (payload.type === 'question') {
        commentState = state.question.comments
      } else if (payload.type === 'answer') {
        let index = state.question.answers.findIndex(el => el._id === payload.idanswer)
        commentState = state.question.answers[index].comments
      }
      let index = commentState.findIndex(el =>  el._id === payload.id)
      commentState.splice(index, 1)
    },
    ADD_ANSWER (state, payload) {
      state.question.answers.push(payload);
    },
    UPDATE_ANSWER (state, payload) {
      let index = state.question.answers.findIndex(el => el._id === payload._id)
      state.question.answers[index].title = payload.title
      state.question.answers[index].description = payload.description
    },
    DELETE_ANSWER (state, payload) {
      let index = state.question.answers.findIndex(el => el._id === payload.id)
      state.question.answers.splice(index, 1)
    },
    ADD_QUESTION (state, payload) {
      state.questions.push(payload)
    },
    SET_MYQUESTION (state, payload) {
      state.myQuestion = payload
    },
    SET_SEARCH_RESULT_QUESITON (state, payload) {
      state.search.input = payload.input
      state.search.questions = payload.questions
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
        .catch(({ response }) => console.log(response))
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
    },
    fetchMyQuestion ({ commit, state }) {
      ax.get('/question/my', { headers: {access_token: localStorage.getItem('access_token')}})
        .then(({ data }) => {
          commit('SET_MYQUESTION', data)
        })
        .catch(({ response }) => console.log(response))
    },
    search ({ commit, state }, keyword) {
      let encodeKeyword = encodeURI(keyword)
      ax.get('/question?search='+encodeKeyword)
        .then(({ data }) => {
          let payload = {
            input: keyword,
            questions: data
          }
          commit('SET_SEARCH_RESULT_QUESITON', payload)
        })
    }
  }
})
