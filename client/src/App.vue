<template>
  <div id="app">
      <navbar class="mb-4"/>
      <login v-if="!this.$store.state.isLogin"/>
      <div v-else>
        <div class="row">
          <div class="col-sm-2">
              <sidebarmy/>
          </div>  
          <div class="col-sm-10">
            <router-view/>
          </div>
      </div>
    </div>
    <mfooter/>
  </div>
</template>

<style>
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

<script>
import login from './views/login'
import sidebarmy from './components/sidebarmy'
import navbar from './components/navbar'
import mfooter from './components/footer'
export default {
    created () {
    this.$store.dispatch('fetch_question')
    if(!localStorage.getItem('token')){
      this.$store.commit('CHANGE_LOGIN_STATUS',false)
    }else{
      this.$store.commit('CHANGE_LOGIN_STATUS',true)
    }
  },
  components: {
    login,
    sidebarmy,
    navbar,
    mfooter
  }
}
</script>