import ax from '../apis/server';
import router from '../router' ;
import store from '../store';

export default {
    state: {
        question: '',
        questions: [],
        initial: [],
        filterTag: '',
        filterWatchedTags: ''        
    },
    mutations: {
        FETCHQUESTIONSDATA(state, payload){
            state.initial = payload
            state.questions = payload
        },
        FETCHQUESTIONDATA(state, payload){
            state.question = payload
        },
        ADDQUESTIONDATA(state, payload){
            state.initial.unshift(payload)
            state.questions.unshift(payload)
        },
        UPDATEQUESTIONDATA(state, payload){

        },
        DELETEQUESTIONDATA(state, payload){
            state.questions = state.initial.filter(el => el._id !== payload._id)
            state.questions = state.questions.filter(el => el._id !== payload._id)
        },
        QUESTIONUPVOTE(state, payload){

        },
        QUESTIONDOWNVOTE(state, payload){

        },
        QUESTIONCANCELVOTE(state, payload){

        },
        SEARCHBYTAG(state, payload){
            router.push('/')
            state.filterTag = payload
            state.questions = state.initial
            state.questions = state.questions.filter(el => {
                return el.tags.some(element => element.name.includes(payload))
            })
        },
        REMOVEFILTER(state){
            state.filterTag = ''
            state.filterWatchedTags = ''
            state.questions = state.initial
        },
        WATCHEDTAGSFILTER(state, payload){
            state.questions = state.initial

            state.questions = state.questions.filter( post => {
                console.log(post.tags)
                return post.tags.map(x => x.name).some( el => payload.includes(el))
            })

            state.filterWatchedTags = true 
        }
    },
    actions: {
        fetchQuestions({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'GET',
                    url: '/questions',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    commit('FETCHQUESTIONSDATA', data)
                    res(data)
                })
                .catch(rej)
            })
        },
        fetchOneQuestion({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'GET',
                    url: '/questions/' + payload,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    commit('FETCHQUESTIONDATA', data)
                    res(data)
                })
                .catch(rej)
            })
        },
        addQuestion({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'POST',
                    url: '/questions',
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    data: {
                        title: payload.title,
                        content: payload.content,
                        tags: payload.tags.map(el => el.value).join(),
                    }
                })
                .then(({ data }) => {
                    commit('ADDQUESTIONDATA')
                    res(data)
                })
                .catch(rej)
            })
        },
        updateQuestion({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'PATCH',
                    url: '/questions/' + payload._id,
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    data: {

                    }
                })
                .then(({ data }) => {
                    commit('')
                    res(data)
                })
                .catch(rej)
            })
        },
        deleteQuestion({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'delete',
                    url: '/questions/' + payload,
                    headers: {
                        token: localStorage.getItem('token')
                    },
                })
                .then(({ data }) => {
                    commit('DELETEQUESTIONDATA', data)
                    res('success')
                })
                .catch(rej)
            })
        },
        upvoteQuestion({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'put',
                    url: '/questions/' + payload,
                    headers: {
                        token: localStorage.getItem('token'),
                    },
                    data: {
                        voteValue: true,
                    }
                })
                .then(({ data }) => {
                    commit('QUESTIONUPVOTE')
                    res(data)
                })
                .catch(rej)
            })
        },
        downvoteQuestion({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'put',
                    url: '/questions/' + payload,
                    headers: {
                        token: localStorage.getItem('token'),
                    },
                    data: {
                        voteValue: false,
                    }
                })
                .then(({ data }) => {
                    commit('QUESTIONDOWNVOTE')
                    res(data)
                })
                .catch(rej)
            })
        },
        cancelVoteQuestion({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'put',
                    url: '/questions/' + payload + '/remove',
                    headers: {
                        token: localStorage.getItem('token'),
                    },
                })
                .then(({ data }) => {
                    commit('QUESTIONCANCELVOTE')
                    res(data)
                })
                .catch(rej)
            })
        },
    },
};