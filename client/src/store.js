import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/user';
import questionModule from './modules/question';
import answerModule from './modules/answer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { 
    user: userModule,
    question: questionModule,
    answer: answerModule,
  },
  state: {
    popularTags: [],
  },
  mutations: {
    sendPopularTags(state, payload){
      state.popularTags = payload
    }
  }
});
