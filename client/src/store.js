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
        oneQuestion: {},
        quote: {
            text: '',
            author: ''
        }
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
        },
        SETQUOTE(state, payload) {
            state.quote.text = payload.text
            state.quote.author = payload.author
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
                localStorage.setItem('id', data.id)
                localStorage.setItem('token', data.token)
                Swal.close()
                swal('Login Success')
                setTimeout(() => {
                    commit('SETISLOGIN', true)
                    router.push('/dashboard')
                }, 1700)
            })
            .catch(err => {
                swalerr('Login Fail', err.response.data)
            })
        },
        signUp ({ commit }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${user_url}/`,
                data: {
                    email: payload.email,
                    username: payload.username,
                    password: payload.password
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Register Success')
            })
            .catch(err => {
                swalerr('Register fail', err.response.data)
            })
        },
        signOut ({ commit }, payload) {
            swal('Logout Success')
            setTimeout(() => {
                localStorage.clear()
                commit('SETISLOGIN', false)
                router.push('/')
            },1700)
        },
        fetchQuestion ({ commit }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'get',
                url: question_url,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                commit('SETQUESTION', data)
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
        },
        voteQuestion ({ commit, dispatch }, payload) {
            axios({
                method: 'post',
                url: `${question_url}/${payload.id}`,
                data: {
                    vote: payload.vote
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                dispatch('findOneQuestion', data._id)
            })
            .catch(err => {
                console.log(err)
            })
        },
        voteAnswer ({ commit, dispatch }, payload) {
            axios({
                method: 'post',
                url: `${answer_url}/${payload.id}`,
                data: {
                    vote: payload.vote
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                dispatch('findOneQuestion', data.question)
            })
            .catch(err => {
                console.log(err)
            })
        },
        createAnswer ({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${answer_url}/`,
                data: {
                    title: payload.title,
                    description: payload.description,
                    question: payload.question
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Successfully create answer')
                setTimeout(() => {
                    dispatch('findOneQuestion', data.question)
                }, 1700)
            })
            .catch(err => {
                swalerr('Created Answer failed', err.response.data)
            })
        },
        userQuestion ({ commit,dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'get',
                url: `${question_url}/userQuestion`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                commit('SETQUESTION', data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteUserQuestion ({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'delete',
                url: `${question_url}/${payload}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Succesfully delete question')
                setTimeout(() => {
                    dispatch('userQuestion')
                }, 1700)
            })
            .catch(err => {
                console.log(err)
            })
        },
        editQuestion ({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'put',
                url: `${question_url}/${payload.id}`,
                data: {
                    title: payload.title,
                    description: payload.description
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Sucessfully update')
                setTimeout(() => {
                    dispatch('userQuestion')
                }, 1700)
            })
            .catch(err => {
                swalerr('Fail update question', err.response.data)
            })
        },
        createQuestion ({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'post',
                url: `${question_url}/`,
                data: {
                    title: payload.title,
                    description: payload.description
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('Sucessfully create Question')
                setTimeout(() => {
                    router.push('/user')
                }, 1700)
            })
            .catch(err => {
               swalerr('Failed create Question', err.response.data)
            })
        },
        editAnswer ({ commit, dispatch }, payload) {
            Swal.fire({
                title: 'please wait..'
            })
            Swal.showLoading()
            axios({
                method: 'put',
                url: `${answer_url}/${payload.id}`,
                data: {
                    title: payload.title,
                    description: payload.description
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({ data }) => {
                Swal.close()
                swal('succesfully update answer')
                setTimeout(() => {
                    dispatch('findOneQuestion', payload.question)
                    router.push(`/dashboard/${payload.question}`)
                }, 1700)
            })
            .catch(err => {
                swalerr('Failed update answer', err.response.data)
            })
        },
        getCron ({ commit, dispatch }, payload) {
            axios({
                method: 'get',
                url: "http://localhost:3000/quote",
            })
            .then(({ data }) => {
                commit('SETQUOTE', data)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})
