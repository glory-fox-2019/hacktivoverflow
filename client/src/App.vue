<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({
    //
  }),
  created () {
    if (localStorage.token) {
      this.$router.push('/home/all')
      this.$store.commit('CHANGELOGIN', true)
      let userData = localStorage.getItem('userData')
      this.$store.commit('GETCURRENTUSER', userData)
    } else {
      this.$router.push('/login')
    }
  }
}
</script>
