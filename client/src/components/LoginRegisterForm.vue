<template>
  <div>
    <div v-if="!isRegisterForm" class="card-body mx-auto mt-2" id="formLogin" style="width:30%">
      <button class="btn btn-warning btn-lg mt-3 mb-3" disabled>X overflow</button>
      <h4 class="text-center">Sign In</h4>
      <form v-on:submit.prevent="login">
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input
            v-model="loginFormInput.email"
            type="email"
            class="form-control"
            id="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            v-model="loginFormInput.password"
            type="password"
            class="form-control"
            id="pwd"
            required
          />
        </div>
        <center>
          <button type="submit" class="btn btn-warning">login</button>
        </center>
      </form>
      <hr />
      <hr />
      <!-- <h3>OR</h3> -->

      <center>
        <span>Doesn't have an account?</span>
      </center>
      <center>
        <span>
          Register
          <a href="#" @click="showRegisterForm(true)">here</a>
        </span>
      </center>
      <hr />
    </div>

    <div v-if="isRegisterForm" class="card-body mx-auto mt-2" id="formRegister" style="width:30%">
      <button class="btn btn-warning btn-lg mt-3 mb-3" disabled>X overflow</button>
      <h4 class="text-center">Register Now</h4>
      <form v-on:submit.prevent="register">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" class="form-control" v-model="registerFormInput.username" />
        </div>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" class="form-control" v-model="registerFormInput.email" />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input type="password" class="form-control" v-model="registerFormInput.password" />
        </div>
        <center>
          <button
            type="submit"
            class="btn btn-warning"
            style="background-color: #0f0e0ec5; color : rgb(255, 255, 255);"
          >register</button>
        </center>
        <hr />
        <hr />
        <center>
          <span>Already have an account?</span>
        </center>
        <center>
          <span>
            Login
            <a href="#" @click="showRegisterForm(false)">here</a>
          </span>
        </center>
        <hr />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const server_url = 'http://localhost:3000/users'

export default {
  name: 'loginRegisterForm',
  data () {
    return {
      isRegisterForm: false,
      registerFormInput: {
        username: '',
        email: '',
        password: ''
      },
      loginFormInput: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    showRegisterForm (cond) {
      this.isRegisterForm = cond
    },
    login () {
      let email = this.loginFormInput.email
      let password = this.loginFormInput.password
      // this.$swal.fire({
      //   title: "Creating your task...",
      //   allowOutsideClick: () => !Vue.swal.isLoading()
      // });
      this.$swal.showLoading()

      axios({
        url: `${server_url}/login`,
        method: 'POST',
        data: {
          email,
          password
        }
      })
        .then(response => {
          console.log(response.data)
          let token = response.data.token
          let username = response.data.username
          localStorage.setItem('token', token)
          localStorage.setItem('username', username)
          this.$store.commit('LOGIN_STATUS', true)
          this.$store.commit('CURRENT_USER', username)
          this.$swal.close()
          this.$swal.fire({
            type: 'success',
            title: 'You Have successfully Login!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          // console.log(err);
          let message = err.response.data.message
          this.$swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    register () {
      let username = this.registerFormInput.username
      let email = this.registerFormInput.email
      let password = this.registerFormInput.password
      this.$swal.showLoading()
      axios({
        url: `${server_url}/register`,
        method: 'POST',
        data: this.registerFormInput
      })
        .then(response => {
          // console.log(response.data);
          this.$swal.close()
          this.$swal.fire({
            type: 'success',
            title: 'You Have successfully register!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          // console.log(err);
          let message = err.response.data.message
          this.$swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }
}
</script>

<style>
</style>
