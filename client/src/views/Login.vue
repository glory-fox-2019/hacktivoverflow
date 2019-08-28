<template>
  <div class="ui container middle aligned center aligned grid">
    <div class="six wide column" style="margin-top: 14.5rem;">
      <h2 class="ui teal image header">
        <div class="content" id="title">Log-in to Your Account</div>
      </h2>

      <form class="ui large form" @keyup.enter.prevent="login">
        <div class="ui basic segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="mail icon"></i>
              <input type="text" name="email" placeholder="E-mail address" v-model="email">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password" v-model="password">
            </div>
          </div>

          <div class="ui error message" :class="{ visible: errMsg }">
            <i class="close icon" @click="errMsg = ''"></i>
            <ul class="list">
              <li>{{ errMsg }}</li>
            </ul>
          </div>

          <div class="ui fluid large teal submit button" @click="login">
            <p>Login</p>
          </div>
        </div>
      </form>
      <br>

      <div class="ui message">
        <p>
          Don't have account ?<br>
          <router-link to="/register">Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import backend from '@/api/backend'
import swal from 'sweetalert'
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: '',
      errMsg: ''
    }
  },
  methods: {
    login () {
      backend
        .post('/login', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem('email', this.email)
          localStorage.setItem('accesstoken', data.accesstoken)
          this.$store.commit('storeTag', data.watch_tag)
          this.$store.commit('setEmail', this.email)
          this.$store.commit('setLogin', true)
          this.$router.push('/')
          this.email = ''
          this.password = ''
          swal('Login Success', '', 'success')
        })
        .catch(err => {
          if (err.response) {
            this.errMsg = err.response.data
          } else {
            console.log(err)
          }
        })
    }
  }
}
</script>

<style>
</style>
