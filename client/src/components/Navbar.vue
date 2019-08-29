<template>
  <b-navbar fixed="top" type="dark" variant="dark" style="padding-right:120px; padding-left:120px" >
    <b-navbar-nav >
      <b-nav-item href="#" disabled>CODE SOLUTION</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto" id="loginbar" style="padding-right: 0px;">
      <b-nav-item v-if="!isLogin" @click.prevent="clickLogin">LOGIN</b-nav-item>
      <b-nav-item v-else @click.prevent="clickLogout">LOGOUT</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Navbar",
  props: {
    msg: String
  },
  methods: {
    clickLogin() {
      this.$router.push('/login')
    },
    clickLogout() {
      this.$store.dispatch('signout')
    }
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: "Lexend Deca", sans-serif;
}

ul li {
  border-bottom: none;
}

#loginbar .nav-item {
  text-align: right;
}

</style>
