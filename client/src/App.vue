<template>
  <div id="app">
    <Navbar></Navbar>
    <div style="height: 3.5rem;">&nbsp;</div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch('fetchQuestions');
    localStorage.token ? this.checkLogin() : false;
  },
  methods: {
    checkLogin() {
      this.$store.dispatch('getUserData')
      .then(() => {
        if(!this.$store.getters.error) {
          this.$store.dispatch('fetchQuestionsBelongs')
        }
      })
    }
  }
}
</script>
<style>
#app {
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
