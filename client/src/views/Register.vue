<template>
  <b-col cols="12" sm="8" md="6" lg="4" offset-sm="2" offset-md="3" offset-lg="4" class="base">
    <b-card class="p-3 w-100">
      <b-card-header> <h5> Register </h5> </b-card-header>
      <b-alert v-model="errorLogin" variant="danger" dismissible>{{errorMessage}}</b-alert>
      <b-row class="mt-2">
        <b-col cols="12">
          <b-form @submit.prevent="register">
            <b-form-group label="Username :" label-for="username">
              <b-form-input
                id="username"
                type="text"
                v-model="form.username"
                required
                placeholder="Enter username"
              ></b-form-input>
            </b-form-group>
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
            <b-button variant="success" v-if="!isProc" type="submit">Login</b-button>
            <div class="text-center" v-if="isProc">
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
import Swal from 'sweetalert2';
import axios from '../api/config';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      isProc: false,
      errorLogin: false,
      errorMessage: '',
    };
  },
  methods: {
    register() {
      const input = this.form;
      this.isProc = true;
      axios({
        method: 'post',
        url: '/user/register',
        data: input,
      })
        .then(({ data }) => {
          this.isProc = false;
          Swal.fire({
            type: 'success',
            title: 'Successfuly registered!',
          });
          this.$router.push('/login');
        })
        .catch((err) => {
          this.isProc = false;
          this.errorLogin = true;
          this.errorMessage = err.response.data.message;
        });
    },
  },
};
</script>

<style>
.base {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: left;
  margin: auto;
  transition: transform 0.8;
}
.base:hover {
  transform: scale(1.1);
}
</style>
