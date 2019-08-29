import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const users_url = 'http://35.192.45.25/users/'
const questions_url = "http://localhost:3000/questions"
const answer_url = "http://localhost:3000/answers"
const cart_url = 'http://35.192.45.25/carts'
const transaction_url = 'http://35.192.45.25/transactions'

Vue.use(Vuex)
Vue.use(VueSweetalert2)

export default new Vuex.Store({
  state: {
    isLogin : false,
    allQuestions:[],
    userQuestions:[],
    userAnswers :[],
    currentUser : "",
    theQuestionDetail : {
        UserId : {},
        upvotes : [],
        downvotes : []
    },
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
        // console.log(payload)
        state.answers = payload

    },
    USER_QUESTIONS(state,payload){
        state.userQuestions = payload
    },

    CURRENT_USER(state,payload){
        state.currentUser = payload
    },
    USER_ANSWER(state, payload){
        state.userAnswers = payload
    }


  },
  actions: {

    getAllQuestions({commit}){
        let token = localStorage.getItem("token")
        Vue.swal.showLoading()

        axios({
            url : `${questions_url}`,
            method : "GET",
            headers : {token}
        })
        .then(response=>{
            Vue.swal.close()
            // console.log(response.data)
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
        Vue.swal.showLoading()
        axios({
            url : `${questions_url}/${id}`,
            method : "GET",
            headers : {
                token
            }
        })
        .then(response=>{
            Vue.swal.close()
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
        Vue.swal.showLoading()

        axios({
            url : `${answer_url}/${QuestionId}`,
            method : "GET",
            headers : {
                token
            }
        })
        .then(response=>{
            Vue.swal.close()
            // console.log(response.data)
            commit("ALL_ANSWER", response.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
,
    createAnswer({commit,dispatch},payload){
        Vue.swal.showLoading()
        let token = localStorage.getItem("token")
        axios({
            url:`${answer_url}`,
            method : "POST",
            data : payload,
            headers : {token},
        })
        .then(response=>{
            // console.log(response.data)
            Vue.swal.close()
            dispatch("getAnswer", payload.QuestionId)

        })
        .catch(err=>{
            console.log(err)
        })

    },
    createQuestion({commit,dispatch}, payload){
        let token = localStorage.getItem("token")
        Vue.swal.fire({
                title: 'Creating your question...',
                allowOutsideClick: () => !Vue.swal.isLoading()
              })
        Vue.swal.showLoading() 
        
        axios({
            url : `${questions_url}`,
            method : "POST",
            data : payload,
            headers : {token}
        })
        .then(response=>{
           Vue.swal.close()
           Vue.swal.fire({
                type : "success",
                title : "You have created question",
                showConfirmButton : false,
                timer : 1500
            })
            // console.log(response.data)
            dispatch("getAllQuestions")
        })
        .catch(err=>{
            // console.log(err)
            let message = err.response.data.message
            Vue.swal.fire({
                type : "error",
                title : message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    },
    
    getUserQuestions({commit}){
        let token = localStorage.getItem("token")
        Vue.swal.showLoading()
        axios({
            url : `${questions_url}/user`,
            method : "GET",
            headers : {token}
        })
        .then(response=>{
            Vue.swal.close()
            // console.log(response.data)
            let allQuestion = response.data
            commit("USER_QUESTIONS", allQuestion)
        })
        .catch(err=>{
            // console.log(err)
            let message = err.response.data.message
            // this.$swal.fire({
            //     type : "error",
            //     title : message,
            //     showConfirmButton: false,
            //     timer: 1500
            // })
        })

    },
    editQuestion({commit,dispatch},payload){
        let token = localStorage.getItem('token')
        let {title,description,id} = payload
        Vue.swal.showLoading()
        axios({
            url :`${questions_url}/${id}`,
            method : "PATCH",
            data :{title,description},
            headers : {
                token
            }
        })
        .then(response=>{
            // console.log(response.data)
            dispatch("getUserQuestions")
            Vue.swal.close()
            Vue.swal.fire({
                 type : "success",
                 title : "You have successfully edited your question",
                 showConfirmButton : false,
                 timer : 1500
             })

        })
        .catch(err=>{
            // console.log(err)
            let message = err.response.data.message
            Vue.swal.fire({
                type : "error",
                title : message,
                showConfirmButton: false,
                timer: 1500
            })
          
        })
    },
    deleteQuestion({commit,dispatch},payload){

        console.log("masuk ke delete dari store")
        let token = localStorage.getItem("token")
        let id = payload
        Vue.swal.showLoading()
        axios({
            url : `${questions_url}/${id}`,
            method :"DELETE",
            headers : {
                token
            }
        })
        .then(response=>{
            // console.log(response.data)
            Vue.swal.close()
            Vue.swal.fire({
                type : "success",
                title : "You have successfully delete your question",
                showConfirmButton : false,
                timer : 1500
            })
            dispatch("getAllQuestions")
            dispatch("getUserQuestions")
        })
        .catch(err=>{
            console.log(err)
        })

    },

    upvoteQuestion({commit,dispatch}, payload){
        Vue.swal.showLoading()
        let id = payload
        let token = localStorage.getItem('token')
        axios({
            url : `${questions_url}/upvote`,
            method : "POST",
            data : {id},
            headers : {
                token
            }
        })
        .then(response=>{
            // console.log(response.data)
            Vue.swal.close()
            dispatch("getAllQuestions")
            dispatch("getOneQuestion", id)
        })
        .catch(err=>{
            // console.log(err)
            let message = err.response.data.message
            Vue.swal.fire({
                type : "error",
                title : message,
                showConfirmButton: false,
                timer: 1500
            })
        })

    },

    downvoteQuestion({commit, dispatch}, payload){
        Vue.swal.showLoading()
        let id = payload
        let token = localStorage.getItem('token')
        axios({
            url : `${questions_url}/downvote`,
            method : "POST",
            data : {id},
            headers : {
                token
            }
        })
        .then(response=>{
            Vue.swal.close()
            // console.log(response.data)
            dispatch("getAllQuestions")
            dispatch("getOneQuestion", id)
            
        })
        .catch(err=>{
            console.log(err)
            let message = err.response.data.message
            Vue.swal.fire({
                type : "error",
                title : message,
                showConfirmButton: false,
                timer: 1500
            })
        })
       
    },

    upvoteAnswer({commit,dispatch}, payload){
        // console.log(payload)
        Vue.swal.showLoading()
        let id = payload.id
        let token = localStorage.getItem('token')
        axios({
            url : `${answer_url}/upvote`,
            method : "POST",
            data : {id},
            headers : {
                token
            }
        })
        .then(response=>{
            // console.log(response.data)
            // dispatch("getAnswer")
            dispatch("getAnswer", payload.QuestionId)
            Vue.swal.close()
            // dispatch("getAllQuestions")
            // dispatch("getOneQuestion", id)
            
        })
        .catch(err=>{
            console.log(err.response)
            let message = err.response.data.message
            Vue.swal.fire({
                type : "error",
                title : message,
                showConfirmButton: false,
                timer: 1500
            })
        })

    },

    downvoteAnswer({commit, dispatch}, payload){
        // console.log(payload)
        Vue.swal.showLoading()
        let id = payload.id
        let token = localStorage.getItem('token')
        axios({
            url : `${answer_url}/downvote`,
            method : "POST",
            data : {id},
            headers : {
                token
            }
        })
        .then(response=>{
            // console.log(response.data)
            Vue.swal.close()
            // dispatch("getAnswer")
            dispatch("getAnswer", payload.QuestionId)
            // dispatch("getAllQuestions")
            // dispatch("getOneQuestion", id)
        })
        .catch(err=>{
            // console.log(err)
            let message = err.response.data.message
            Vue.swal.fire({
                type : "error",
                title : message,
                showConfirmButton: false,
                timer: 1500
            })
        })
       
    },
    getUserAnswers({commit,dispatch}){
        let token = localStorage.getItem("token")
        Vue.swal.showLoading()
        axios({
            url : `${answer_url}`,
            method : "GET",
            headers : {token}
        })
        .then(response=>{
            // console.log(response.data)
            let payload  =response.data
            commit("USER_ANSWER",payload)
            Vue.swal.close()
        })
        .catch(err=>{
            console.log(err)
        })
    },

    editAnswer({commit, dispatch},payload){
        let token = localStorage.getItem("token")

        let id = payload.id
        let title = payload.title
        let description = payload.description
        // console.log(de)

        axios({
            url : `${answer_url}/${id}`,
            method : "PATCH",
            data : {title,description},
            headers : {token}
        })
        .then(response=>{
            // console.log(response.data)
            dispatch("getUserAnswers")
            Vue.swal.close()
            Vue.swal.fire({
                 type : "success",
                 title : "You have successfully edited your answer",
                 showConfirmButton : false,
                 timer : 1500
            })
            
        })
        .catch(err=>{
            // console.log(err)
            let message = err.response.data.message
            Vue.swal.fire({
                type : "error",
                title : message,
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
,
    deleteAnswer({commit,dispatch}, id){

        let token = localStorage.getItem("token")
        Vue.swal.showLoading()
        axios({
            url :`${answer_url}/${id}`,
            method :"DELETE",
            headers : {token}
        })
        .then(response=>{
            // console.log(response.data)
            Vue.swal.close()
            Vue.swal.fire({
                type : "success",
                title : "You have successfully delete your question",
                showConfirmButton : false,
                timer : 1500
            })
            dispatch("getUserAnswers")
        })
        .catch(err=>{
            // console.log(err)
            let message = err.response.data.message
            Vue.swal.fire({
                type : "error",
                title : message,
                showConfirmButton: false,
                timer: 1500
            })
        })

    }

  }
})








