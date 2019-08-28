import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

const users_url = 'http://35.192.45.25/users/'
const questions_url = "http://localhost:3000/questions"
const answer_url = "http://localhost:3000/answers"
const cart_url = 'http://35.192.45.25/carts'
const transaction_url = 'http://35.192.45.25/transactions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin : false,
    allQuestions:[],
    theQuestionDetail : {},
    answers : [],
  },
  mutations: {

    LOGIN_STATUS(state, payload){
        
        state.isLogin = payload

    },
    ALL_QUESTIONS(state, payload){
        state.allQuestions = payload
    },
    QUESTION_DETAIL(state, payload){
        // console.log(payload ,"dari commit question detail")
        state.theQuestionDetail = payload

    }
,
    ALL_ANSWER(state, payload){
        console.log(payload)
        state.answers = payload

    }


  },
  actions: {

    getAllQuestions({commit}){
        let token = localStorage.getItem("token")

        axios({
            url : `${questions_url}`,
            method : "GET",
            headers : {token}
        })
        .then(response=>{
            console.log(response.data)
            let allQuestion = response.data
            commit("ALL_QUESTIONS", allQuestion)
        })
        .catch(err=>{
            console.log(err)
        })

    },

    getOneQuestion({commit},payload){
        let id = payload
        let token = localStorage.getItem("token")
        axios({
            url : `${questions_url}/${id}`,
            method : "GET",
            headers : {
                token
            }
        })
        .then(response=>{
            // console.log(response.data)
            let question = response.data
            commit("QUESTION_DETAIL", question)
        })
        .catch(err=>{
            console.log(err)
        })
    }
,
    getAnswer({commit},payload){

        let QuestionId = payload
        let token = localStorage.getItem("token")

        axios({
            url : `${answer_url}/${QuestionId}`,
            method : "GET",
            headers : {
                token
            }
        })
        .then(response=>{
            console.log(response.data)
            commit("ALL_ANSWER", response.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
,
    createAnswer({commit,dispatch},payload){

        let token = localStorage.getItem("token")
        axios({
            url:`${answer_url}`,
            method : "POST",
            data : payload,
            headers : {token},
        })
        .then(response=>{
            console.log(response.data)
            dispatch("getAnswer", payload.QuestionId)

        })
        .catch(err=>{
            console.log(err)
        })

    },
    createQuestion({commit,dispatch}, payload){
        let token = localStorage.getItem("token")
        axios({
            url : `${questions_url}`,
            method : "POST",
            data : payload,
            headers : {token}
        })
        .then(response=>{
            // console.log(response.data)
            dispatch("getAllQuestions")
        })
        .catch(err=>{
            console.log(err)
        })
    }

   
  }
})








