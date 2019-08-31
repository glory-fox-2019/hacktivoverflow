<template>
  <div id="login" class="auth">
      <div class="card">
        <div class="auth--banner">
          <p>Hacktiv<br><b>Overflow</b></p>
        </div>
        <div class="auth--form">
          <form @submit.prevent="login({email: email, password: password})">
            <h2>Login</h2>
            <div class="form-group">
              <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" v-model="password">
            </div>
            <p>Doesn't have an account? <router-link to="/register">Register</router-link></p>
            <button type="submit" class="btn">Submit</button>
          </form>
          <div class="auth--divider">
            <p>Or</p>
          </div>
          <div class="auth--form--google">
            <G-Signin-Button></G-Signin-Button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import GSigninButton from '@/components/GSigninButton'
import { mapState } from 'vuex'
import ax from '@/config/axios'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
    if (this.isLogin) {
      this.$router.replace('/')
    }
  },
  components: { GSigninButton },
  methods: {
    login (payload) {
      ax({
        url: '/user/login',
        method: 'post',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$store.commit('SET_USER', data.payload)
          this.$store.commit('SET_ISLOGIN', true)
        })
        .catch(({ response }) => {
          this.$swal({
            type: 'error',
            title: 'Error!',
            text: response.data.error
          })
        })
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    isLogin (val) {
      if (val) this.$router.replace('/')
    }
  }
}
</script>

<style>

</style>
