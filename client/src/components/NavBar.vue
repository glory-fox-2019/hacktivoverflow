<template>
  <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <i class="fab fa-stack-overflow indigo--text"></i> <span class="orange--text"> Hacktiv</span>
        <span class="font-weight-light">Overflow</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!isLogin" router-link to="/register"> Register </v-btn>
      <v-btn v-if="!isLogin" router-link to="/Login"> Login </v-btn>
      <v-btn v-else @click="logout"> Logout </v-btn>
    </v-app-bar>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'navbar',
  computed: mapState([
    'isLogin'
  ]),

  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      this.$store.commit('CHANGELOGIN', false)
      this.$router.push('/login')
    },
  }
}
</script>

<style>

</style>