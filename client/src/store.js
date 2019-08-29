import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { deflateRawSync } from 'zlib';
import { stat } from 'fs';
const baseURL = `http://localhost:3000`;
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        questions: [],
        question: {},
        isLogin: false,
    },
    mutations: {
        changelogin(state, status) {
            state.isLogin = status;
        },
        fillQuestions(state, data) {
            state.questions = data;
            // console.log(state.questions);
        },
        fillQuestion(state, data) {
            state.question = data;
            // console.log(state.question);
        }

    },
    actions: {
        signup(context, data) {
            axios({
                url: `${baseURL}/users/sign-up`,
                method: 'post',
                data
            })
                .then(({ data }) => {
                    Swal.fire('Success', 'Success register as new user', 'success')
                    console.log(data);
                })
                .catch(console.log)
        },
        signin(context, data) {
            console.log(data);
            return axios({
                url: `${baseURL}/users/sign-in`,
                method: 'post',
                data
            })
                
        },
        readAll(context) {
            const token = localStorage.getItem('token');
            console.log(token);
            axios({
                url: `${baseURL}/questions`,
                headers: {
                    token
                },
                method: 'get',
            })
                .then(({ data }) => {
                    // console.log(data);
                    context.commit('fillQuestions', data);
                })
                .catch(console.log)
        },
        readOne(context, id) {
            const token = localStorage.getItem('token');
            axios({
                url: `${baseURL}/questions/${id}`,
                headers: {
                    token
                },
                method: 'get',
            })
                .then(({ data }) => {
                    // console.log(data);
                    context.commit('fillQuestion', data);
                })
                .catch(console.log)
        },
        createPost(context, data) {
            const token = localStorage.getItem('token');
            axios({
                url: `${baseURL}/questions`,
                method: 'post',
                headers: {
                    token
                },
                data
            })
                .then(({ data }) => {
                    console.log(data);
                    context.dispatch('readAll')
                    Swal.fire('Success', 'Post created', 'success');
                })
                .catch(console.log)
        },
        vote(context, data) {
            console.log(data.id);
            const token = localStorage.getItem('token');
            axios({
                url: `${baseURL}/questions/vote/${data.id}`,
                method: 'patch',
                headers: {
                    token
                },
                data: {
                    value: data.value
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    context.dispatch('readOne', data._id);
                })
                .catch(console.log)
        },
        voteAnswer(context, data) {
            const QuestionId = data.QuestionId
            const token = localStorage.getItem('token');
            axios({
                url: `${baseURL}/answer/vote/${data.id}`,
                headers: {
                    token
                },
                method: 'patch',
                data: {
                    value: data.value
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    context.dispatch('readOne', QuestionId);
                })
                .catch(console.log)
        },
        addAnswer(context, data) {
            const token = localStorage.getItem('token');
            axios({
                // http://localhost:3000/answer/5d66cc74f741b904c55c9cca
                url: `${baseURL}/answer/${data.id}`,
                method: 'post',
                headers: {
                    token
                },
                data: {
                    answer: data.answer
                }
            })
                .then(({ data }) => {
                    console.log(data);
                    context.dispatch('readOne', data._id);
                    Swal.fire('Success', 'Answer submited', 'success');
                })
                .catch(console.log)
        }
    },
})