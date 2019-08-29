import ax from '../apis/server.js';

export default {
    state: {
        isLogin: false,
        watchedTags: []
    },
    mutations: {
        LOGIN(state, payload){
            state.isLogin = true;
        },
        REGISTER(state, payload){
            console.log('User registered!')  
        },
        LOGOUT(state, payload){
            localStorage.clear()
            state.isLogin = false;
        },
        FETCHWATCHEDTAGS(state, payload){
            state.watchedTags = payload
        }
    },
    actions: {
        login({ commit }, payload){
            return new Promise(function(resolve, reject){
                ax({
                    method: 'post',
                    url: '/users/login',
                    data: {
                        email: payload.email,
                        password: payload.password,
                    },
                })
                .then(({ data }) => {
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('id', data.id);
                    commit('LOGIN', data);
                    resolve(data);
                })
                .catch(reject);
            })
        },
        register({ commit }, payload){
            return new Promise(function(resolve, reject){
                ax({
                    method: 'post',
                    url: '/users/register',
                    data: {
                        email: payload.email,
                        password: payload.password,
                        username: payload.username,
                    },
                })
                .then(({ data }) => {
                    commit('REGISTER');
                    resolve(data);
                })
                .catch(reject);
            })
        },
        fetchWatchedTags({ commit }, payload){
            return new Promise(function(resolve, reject){
                ax({
                    method: 'get',
                    url: '/users/tags',
                    headers: {
                        'token': localStorage.getItem('token'),
                    }
                })
                .then(({ data }) => {
                    commit("FETCHWATCHEDTAGS", data)
                })
                .catch(console.log)
            })
        },
        addWatchedTags({ commit }, payload){
            return new Promise(function(resolve, reject){
                ax({
                    method: 'put',
                    url: '/users/tags',
                    headers: {
                        'token': localStorage.getItem('token'),
                    },
                    data: {
                        name: payload
                    }
                })
                .then(({ data }) => {
                    commit("ADDWATCHEDTAGS", data)
                    resolve(data)
                })
                .catch(reject)
            })
        },
        removeWatchedTags({ commit }, payload){
            return new Promise(function(resolve, reject){
                ax({
                    method: 'delete',
                    url: '/users/tags',
                    headers: {
                        'token': localStorage.getItem('token'),
                    },
                    data: {
                        name: payload
                    }
                })
                .then(({ data }) => {
                    commit("REMOVEWATCHEDTAGS", data)
                    resolve(data)
                })
                .catch(reject)
            })
        }
    },
}