<template>
  <b-container class="d-flex align-items-center justify-content-center" style="height: 100vh;">
    <div class="col-4">
        <h1 class="standout text-center" style="font-size: 4rem;"><b>Register</b></h1>
      <form @submit.prevent="signUp">
        <input v-model="user.email" class="form-control mt-3 shadow-sm"
        type="email" placeholder="Email">
        <input v-model="user.username" class="form-control mt-3 shadow-sm"
        type="text" placeholder="Username">
        <input v-model="user.password" class="form-control mt-3 shadow-sm"
        type="password" placeholder="Password">
        <input v-if="!isLoading" class="form-control mt-3 btn-primary"
        type="submit" value="Sign Up">
        <b-button v-else class="form-control btn-primary mt-3" disabled>
          <b-spinner small></b-spinner>
          Loading...
        </b-button>
      </form>
      <hr>
      <p class="mt-2 text-center text-secondary">
        Already have an account?
        <router-link to="login"> Login</router-link>
      </p>
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
    }),
  },
  methods: {
    signUp() {
      this.isLoading = true;
      this.$store.dispatch('register', this.user)
      .then(() => {
        this.isLoading = false;
        this.$router.push('/login');
      })
      .catch(console.log)
    },
  },
};
</script>

<style>

</style>
