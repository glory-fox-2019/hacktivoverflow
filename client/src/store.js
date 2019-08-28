import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    questionBundle: [],
    tags: [],
  },
  mutations: {
    FETCH_QUESTION(state, payload) {
      state.questionBundle = payload;
    },
    FETCH_TAGS(state, payload) {
      state.tags = payload;
    }
  },
  actions: {
    signIn({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/user/signin`,
          data: payload,
        })
        .then(({data}) => {
          resolve('Berhasil login!');
          localStorage.setItem('token', data.token);
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    signUp({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/user/signup`,
          data: payload,
        })
          .then(({data}) => {
            resolve('Berhasil register!');
            localStorage.setItem('token', data.token);
          })
          .catch(({response}) => {
            reject(response.data.message);
          })
      })
    },
    fetchQuestion({ commit, state }) {
      axios({
        method: 'GET',
        url: `${state.baseUrl}/question`,
        headers: {
          token: localStorage.getItem('token'),
        }
      })
        .then(({data}) => {
          commit('FETCH_QUESTION', data.data);
          commit('FETCH_TAGS', data.tags);
        })
        .catch(({response}) => {
          console.log(response.data.message);
        })
    },
    getOneQuestion({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `${state.baseUrl}/question/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          }
        })
          .then(({data}) => {
            resolve(data);
          })
          .catch(({response}) => {
            console.log(response.data.message);
          })
      })
    },
    askQuestion({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/question`,
          headers: {
            token: localStorage.getItem('token'),
          },
          data: payload,
        })
        .then(({data}) => {
          dispatch('fetchQuestion');
          resolve('Berhasil!');
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    upVote({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/question/upvote/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(_ => {
          dispatch('fetchQuestion');
          resolve();
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    downVote({ state, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/question/downvote/${payload}`,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(_ => {
          dispatch('fetchQuestion');
          resolve();
        })
        .catch(({response}) => {
          reject(response.data.message);
        })
      })
    },
    answerQuestion({ state }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: `${state.baseUrl}/answer`,
          headers: {
            token: localStorage.getItem('token'),
          },
          data: payload,
        })
        .then(({ data }) => {
          dispatch('fetchQuestion');
          resolve(data.message);
        })
        .catch(({response}) => {
          console.log(response);
          reject(response.data.message);
        })
      })
    }
  },
});
