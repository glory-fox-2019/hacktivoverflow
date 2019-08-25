import Vue from 'vue'
import Vuex from 'vuex'
import ax from '@/config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    question: {},
  },
  mutations: {
    
  },
  actions: {
    fetchQuestion({commit, state}, id) {
      ax({
        url: '/question/'+id,
      })
      .then(({data}) => {
        state.question = data;
      })
      .catch(({ response }) => {
        this.$swal({
          type: 'error',
          title: 'Error!',
          text: response.data.error,
        });
      });
    },
    fetchQuestions({commit, state}){
      ax({
        url: '/question'
      })
      .then(({data}) => {
        state.questions = data
      })
      .catch(({ response }) => {
        this.$swal({
          type: 'error',
          title: 'Error!',
          text: response.data.error,
        });
      });
    }
  }
})
