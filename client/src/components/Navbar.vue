<template>
  <div>
    <b-navbar fixed="top" variant="white" type="light" class="d-flex justify-content-between shadow-sm">
        <b-navbar-brand href="#">
          <router-link to="/">
            <img src="https://storage.googleapis.com/hacktiv8-assets-adityabp/Logo-Sleepless-Dark.png" alt="sleepless" height="32px" class="mr-3">
          </router-link>
        </b-navbar-brand>
        <b-navbar-nav align-item="center">
            <router-link v-if="!isLogin" to="/login" class="text-secondary">Login</router-link>
            <a v-else class="text-secondary" to="/" @click="$store.commit('LOGOUT')">Logout</a>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin
    }
  }
};
</script>s

<style>

</style>
