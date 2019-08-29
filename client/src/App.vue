<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import io from 'socket.io-client';
import store from './store'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  created(){
      const socket = io('http://localhost:3000');

      socket.on('tag:popular',function(data){
        store.commit('sendPopularTags', data)
      })

      if(localStorage.getItem('token')){
        store.commit('LOGIN')
      }
  }
};


let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100);
    overflow-x:hidden;
    font-family: 'Raleway', sans-serif;
  }
</style>
