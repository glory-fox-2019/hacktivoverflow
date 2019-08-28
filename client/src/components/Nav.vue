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
        <div class="nav__action">
          <router-link to="/createQuestion" v-if="isLogin">+&nbsp;Question</router-link>
          <router-link to="/login" v-if="!isLogin">Login</router-link>
        </div>
        <div class="nav__account" v-if="isLogin">
          <a href="javascript:void(0)" class="nav__account--button">
            <!-- <div class="nav__account__avatar"></div> -->
            <div class="nav__account__name">{{ user.name }}</div>
          </a>
          <div class="nav__account__menu">
            <ul>
              <li><a href="javascript:void(0)" @click="logout" v-if="isLogin">logout</a></li>
              <li><router-link to="/user/myquestion" @click="logout" v-if="isLogin">My Question</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('LOGOUT')
    }
  },
  computed: {
    ...mapState(['isLogin', 'user'])
  }
}
</script>

<style>

</style>
