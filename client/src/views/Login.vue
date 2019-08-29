`<template>
  <b-col cols="12" sm="8" md="6" lg="4" offset-sm="2" offset-md="3" offset-lg="4" class="base">
    <b-card class="p-3 w-100">
      <h4>Login</h4>
      <b-alert v-model="errorLogin" variant="danger" dismissible>{{errorMessage}}</b-alert>

      <b-row>
        <b-col cols="12">
          <b-form @submit.prevent="login">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                type="email"
                v-model="form.email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                type="password"
                v-model="form.password"
                required
                placeholder="Enter Password"
              ></b-form-input>
            </b-form-group>
            <b-button variant="success" v-if="!loginProc" type="submit">Login</b-button>
            <div class="text-center" v-if="loginProc">
              <b-spinner label="Spinning"></b-spinner>
              <b-spinner type="grow" label="Spinning"></b-spinner>
              <b-spinner variant="primary" label="Spinning"></b-spinner>
              <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
              <b-spinner variant="success" label="Spinning"></b-spinner>
              <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>

<script>
import axios from '../api/config.js';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loginProc: false,
      errorLogin: false,
      errorMessage: '',
    };
  },
  methods: {
    login() {
      this.loginProc = true;
      const input = this.form;
      axios({
        method: 'post',
        url: '/user/login',
        data: input,
      })
        .then(({ data }) => {
          this.loginProc = false;
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.data._id);
          this.$store.commit('SAVELOGIN');
          this.$router.push('/question');
        })
        .catch((err) => {
          this.loginProc = false;
          this.errorLogin = true;
          this.errorMessage = err.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.base {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: left;
  margin: auto;
  transition: transform .8;
}
.base:hover{
    transform: scale(1.1)
}
</style>
