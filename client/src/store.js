import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: 'http://18.140.71.88',
    loggedUser: null,
    posts: [],
    watchedTags: []
  },
  mutations: {
    login(state, payload){
      state.loggedUser = payload
    },
    setPosts(state, payload){
      state.posts = payload
    },
    setWatchedTags(state, payload){
      state.watchedTags = payload
    },
    logout(state){
      state.loggedUser = null
    }
  },
  actions: {
    getAllPosts({state, commit}){
      axios({
        url: `${state.server}/questions`,
        method: 'GET'
      })
      .then(({ data })=>{
        commit('setPosts', data)
      })
    },
    getWatchedTags({state, commit}){
      axios({
        url: `${state.server}/users/tag`,
        method: 'GET',
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data })=>{
        commit('setWatchedTags', data.watch_tag)
      })
      .catch(console.log)
    }
  }
})
