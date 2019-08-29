<template>
  <div id="app" style="min-height: 100vh">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
export default {
  components:{
    navbar
  },
  created(){
    if(localStorage.getItem('access_token')){
      this.$store.commit('login', localStorage.getItem('userId'))
      this.$store.dispatch('getWatchedTags')
    }
    this.$store.dispatch('getAllPosts')
  }
}
</script>

<style>
body{
  background-color: lightblue;
  background-size: contain ;
  background-attachment:fixed;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
