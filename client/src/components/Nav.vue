<template>
  <div id="nav">
    <div class="container">
      <div class="nav__brand">
        <router-link to="/">
          <span>Hacktiv<b>Overflow</b></span>
        </router-link>
      </div>
      <div class="nav__search">
        <input type="text" placeholder="Search Question" v-debounce:200="search" v-model="menu.search">
      </div>
      <div class="nav--right">
        <div class="nav__action">
          <router-link to="/createQuestion" v-if="isLogin">+&nbsp;Question</router-link>
          <router-link to="/login" v-if="!isLogin">Login</router-link>
        </div>
        <div class="nav__account" v-if="isLogin">
          <a href="javascript:void(0)" class="nav__account--button" @click="menu.account = !menu.account">
            <!-- <div class="nav__account__avatar"></div> -->
            <div class="nav__account__name">{{ user.name }}</div>
          </a>
          <div class="nav__account__menu" v-if="menu.account">
            <ul>
              <li><router-link to="/user/myquestion" @click="logout" v-if="isLogin">My Question</router-link></li>
              <!-- <li><router-link to="/user/myquestion" @click="logout" v-if="isLogin">Add Watched tags</router-link></li> -->
              <li><a href="javascript:void(0)" @click="logout" v-if="isLogin">logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ax from '@/config/axios'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      menu: {
        account: false,
        search: ''
      }
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('LOGOUT')
      this.$router.replace('/')
    },
    search () {
      if (this.$route.path !== '/') this.$router.replace('/')
      this.$store.dispatch('search', this.menu.search)
    }
  },
  computed: {
    ...mapState(['isLogin', 'user'])
  }
}
</script>

<style>

</style>
