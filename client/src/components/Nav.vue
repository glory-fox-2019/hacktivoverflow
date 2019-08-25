<template>
  <div id="nav">
    <div class="container">
      <div class="nav__brand">
        <router-link to="/">
          <span>Hacktiv<b>Overflow</b></span>
        </router-link>
      </div>
      <div class="nav__search">
        <input type="text" placeholder="Search Question">
      </div>
      <div class="nav--right">
        <div class="nav__account" v-if="isLogin">
          <div class="nav__account__avatar"></div>
          <div class="nav__account__name">{{ user.name }}</div>
        </div>
        <div class="nav__action">
          <a href="javascript:void(0)" @click="logout" v-if="isLogin">logout</a>
          <router-link to="/login" v-if="!isLogin">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex"

export default {
  methods: {
    logout(){

    }
  },
  computed: {
    ...mapState(['isLogin','user'])
  },
}
</script>

<style>

</style>
