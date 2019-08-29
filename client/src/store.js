import Vue from 'vue'
import Vuex from 'vuex'
import ax from '../config/axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isLogin: false,
    loginEmail: '',
    loginId: '',
    allQuestion : [],
    myQuestion : [],
    tagList: [],
    tagId : []
  },
  mutations: {
    GETLOGINID (state,payload){
      state.loginId = payload
    },
    GETLOGINEMAIL (state, payload) {
      state.loginEmail = payload
    },
    CHANGELOGIN (state, payload) {
      state.isLogin = payload
    },
    GETALLQUESTION (state, payload) {
      state.allQuestion = payload
    },
    GETMYQUESTION (state, payload){
      state.myQuestion = payload
    },
    GETALLTAG (state, payload){
      state.tagList = payload
    },
    GETTAGID (state, payload){
      state.tagId = payload
    }
  },
  actions: {
    getAllQuestion ({ commit }, payload) {
      ax({
        url: `/questions/findAll`,
        method: `get`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('GETALLQUESTION', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    myQuestion ({ commit }, payload) {
      ax({
        url: `/questions/userQuestion`,
        method: `get`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('GETMYQUESTION', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    listTag ({ commit }, payload) {
      ax({
        url: `/tags/findAll`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          commit('GETALLTAG', data)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
  },
  watch: {
    search: function (newVal, oldVal) {
      console.log('ini old val', oldVal, 'ini new val', newVal)
      if (newVal){
        // ax({
        //   url: `/articles/search/${newVal}`,
        //   method: `get`
        // })
        //   .then(({ data }) => {
        //     this.allArticles = data
  
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
      }
    }
  },
})
