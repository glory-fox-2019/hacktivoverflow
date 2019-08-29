<template>
  <div id="app">
    <navbar v-if="getLoginStatus"></navbar>
    <!-- <sidebar v-if="$store.state.isLogin"></sidebar> -->

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/navbar'
import sidebar from './components/sidebar'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    navbar,
    sidebar
  },
  computed: {
    getLoginStatus () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      let username = localStorage.getItem('username')
      this.$store.commit('LOGIN_STATUS', true)
      this.$store.commit('CURRENT_USER', username)
    } else {
      this.$store.commit('LOGIN_STATUS', false)
    }
  }

}
</script>

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
