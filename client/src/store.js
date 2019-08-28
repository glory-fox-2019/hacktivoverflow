import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from './router';

const user_url = "http://localhost:3000/user"
const question_url = "http://localhost:3000/question"
const answer_url = "http://localhost:3000/answer"

Vue.use(Vuex)
function swal(text) {
    Swal.fire({
        type: 'success',
        title: `${text}`,
        showConfirmButton: false,
        timer: 1500
    })
}
function swalerr(text, err) {
    Swal.fire({
        type: 'error',
        title: `${text}`,
        text: `${err}`,
        showConfirmButton: true
    })
}

export default new Vuex.Store({
    state: {
        isLogin: false,
        questions: [],
        oneQuestion: {}
    },
    mutations: {
        SETISLOGIN(state, payload) {
            state.isLogin = payload
        },
        SETQUESTION(state, payload) {
            state.questions = payload
        },
        SETONEQUESTION(state, payload) {
            state.oneQuestion = payload
        }
    },
    actions: {
        signIn({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${user_url}/signIn`,
                data: {
                    email: payload.email,
                    password: payload.password
                }
            })
            .then(({ data }) => {
                localStorage.setItem('token', data.token)
                Swal.close()
                swal('Login Success')
                setTimeout(() => {
                    commit('SETISLOGIN', true)
                    router.push('/dashboard')
                })
            })
            .catch(err => {
                swalerr('Login Fail', err.response.data)
            })
        },
        fetchQuestion ({ commit }, payload) {
            axios({
                method: 'get',
                url: question_url,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                commit('SETQUESTION', data)
                console.log(data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
        },
        findOneQuestion ({ commit }, payload) {
            axios({
                method: 'get',
                url: `${question_url}/${payload}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                commit('SETONEQUESTION', data)
            })
            .catch(err => {
                console.log(err)
            })  
        }
    }
})
