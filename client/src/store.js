import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/server.js'
import router from './router.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    errors: [],
    username: null,
    question: {
      title: '',
      content: '',
      user: '',
      vote: '',
      answers: []
    }
  },
  mutations: {
    login(state, username) {
      state.username = username
      state.isLogin = true
    },
    logout(state) {
      state.username = null
      state.isLogin = false
      localStorage.clear()
      router.push('/')
    },
    error(state, errors) {
      state.errors = errors
    },
    setQuestion(state, question) {
      state.question = {
        title : question.title,
        content : question.content,
        user: question.user,
        vote: question.vote,
        answers: question.answers
      }
    }
  },
  actions: {
    signup(context, user) {
      axios.post('/user/register',user)
        .then(({data}) => {
          context.commit('error', [])
          router.push('/login')
        })
        .catch(err => {
          context.commit('error', err.response.data.errors)
        })
    },
    login(context, user) {
      axios.post('/user/login', user)
        .then(({data}) => {
          router.push('/')
          context.commit('error', [])
          context.commit('login', data.user.username)
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.user.username)
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
          context.commit('error', [err.response.data.message])
        })
    },
    questionDetail(context, id) {
      axios.get(`question/${id}`)
        .then(({data}) => {
          console.log(data)
          let vote = data.upVote.length - data.downVote.length
          if(vote > 0) {
            vote = '+' + vote
          }else if(vote < 0) {
            vote = '-' + vote
          }
          context.commit('setQuestion', {
            title: data.title,
            content: data.content,
            user: data.user.username,
            vote: vote,
            answers: data.answer
          })
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    createQuestion(context, question) {
      axios.post('/question/create', question, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('error', [])
        router.push('/')
        console.log(data)
      })
      .catch(err => {
        context.commit('error', err.response.data.errors)
      })
    },
    upVoteQuestion(context, id) {
      if(!localStorage.getItem("token")){
        context.commit('error', ['You must login first to vote'])
      }else{
        context.commit('error', [])
        axios.put('/question/upvote',{
          id
        },{
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          
        })
        .catch(err => {
          console.log(err.response.data)
        })
      }
    },
    downVoteQuestion(context, id) {
      if(!localStorage.getItem("token")){
        context.commit('error', ['You must login first to vote'])
      }else{
        context.commit('error', [])
      }
    }
  }
})
