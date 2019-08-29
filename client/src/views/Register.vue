<template>
  <div class="container">
    <form class="form-signin" @submit.prevent="submitRegister" style="margin-top: 170px">
      <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      <label for="inputusername" class="sr-only">Username</label>
      <input
        type="username"
        id="inputusername"
        class="form-control"
        placeholder="Username"
        v-model="newUser.username"
        required
        autofocus
      />
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="newUser.email"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="newUser.password"
        required
      />
      <div class="checkbox mb-3" style="text-align: left;margin-top:5px; color: rgba(0,0,0,0.6)">
        <small>Already have account?</small>
        <small style="cursor: pointer;" @click.prevent="clickLogin"> Login</small>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    clickLogin() {
      this.$router.push('/login')
    },
    submitRegister() {
      this.$store.dispatch('signUp', this.newUser)
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="username"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>