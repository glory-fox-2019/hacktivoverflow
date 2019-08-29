<template>
  <div class="ui container middle aligned center aligned grid">
    <div class="six wide column" style="margin-top: 14rem;">
      <h2 class="ui teal image header">
        <div class="content" id="title">Create New Account</div>
      </h2>

      <form class="ui large form" @keyup.enter.prevent="register">
        <div class="ui basic segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" placeholder="Name" v-model="name">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="mail icon"></i>
              <input type="text" placeholder="E-mail address" v-model="email">
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" placeholder="Password" v-model="password">
            </div>
          </div>

          <div class="ui fluid large teal submit button" @click="register">
            <p>Sign Up</p>
          </div>
        </div>

        <div class="ui error message" :class="{ visible: errMsg }">
          <i class="close icon" @click="errMsg = ''"></i>
          <ul class="list">
            <li>{{ errMsg }}</li>
          </ul>
        </div>
      </form>

      <div class="ui message">
        <p>
          Already have account ?<br>
          <router-link to="/login">Login</router-link>
        <br></p>
      </div>
    </div>
  </div>
</template>

<script>
import backend from '@/api/backend'
import swal from 'sweetalert'
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errMsg: ''
    }
  },
  methods: {
    register () {
      backend
        .post('/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.$router.push('/login')
          swal('Register Completed', '', 'success')
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
