<template>
<!-- login -->
<section class="register">
  <h4>Register</h4>
  <form @submit.prevent="register" class="mt-3">
    <div class="form-group mt-4">
      <label>Username</label>
      <input v-model="formRegister.name" type="text" class="form-control" placeholder="">
    </div>
    <div class="Reg-group">
      <label>Email address</label>
      <input v-model="formRegister.email" type="email" class="form-control" placeholder="">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input v-model="formRegister.password" type="password" class="form-control" placeholder="">
    </div>
    <div>
      <button type="submit" class="btn btn-primary mr-3">Register</button>
      <router-link class="toLogin" to="/login" >to login</router-link>
    </div>
  </form>
</section>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'register',
  data() {
    return {
      formRegister: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch('register', this.formRegister);
    },
  },
};
</script>

<style scoped>
.register{
  border: 1px solid whitesmoke;
  width: 25rem;
  padding: 1rem;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
};
</style>
