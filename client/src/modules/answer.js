import ax from '../apis/server';

export default {
    state: {
        answer: '',
        answers: [],
    },
    mutations: {
        FETCHANSWERSDATA(state, payload){
            state.answers = payload 
        },
        FETCHANSWERDATA(state, payload){
            state.answer = payload
        },
        ADDANSWERDATA(state, payload){
            state.answers.push(payload)
        },
        UPDATEANSWERDATA(state, payload){
            
        },
        DELETEANSWERDATA(state, payload){
            state.answers = state.answers.filter(el => el._id !== payload._id)
        },
    },
    actions: {
        fetchAnswers({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'get',
                    url: '/answers/' + payload,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    commit('FETCHANSWERSDATA', data)
                    res(data)
                })
                .catch(rej)
            })
        },
        fetchOneAnswer({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'get',
                    url: '/questions/' + payload._id,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    commit('FETCHANSWERDATA')
                    res(data)
                })
                .catch(rej)
            })
        },
        addAnswer({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'post',
                    url: '/answers',
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    data: {
                        content: payload.content,
                        questionId: payload.questionId,
                    }
                })
                .then(({ data }) => {
                    commit('ADDANSWERDATA', data)
                    res(data)
                })
                .catch(rej)
            })
        },
        updateAnswer({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'patch',
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
        deleteAnswer({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    method: 'delete',
                    url: '/questions/' + payload._id,
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then(({ data }) => {
                    commit('')
                    res(data)
                })
                .catch(rej)
            })
        },
        upvoteAnswer({ commit }, payload){
            return new Promise(function(res, rej){
                ax({

                })
                .then(({ data }) => {
                    commit('')
                    res(data)
                })
                .catch(rej)
            })
        },
        downvoteAnswer({ commit }, payload){
            return new Promise(function(res, rej){
                ax({
                    
                })
                .then(({ data }) => {
                    commit('')
                    res(data)
                })
                .catch(rej)
            })
        },
    },
};