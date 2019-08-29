<template>
  <div class="form">
    <Error v-if="this.$store.state.errors.length > 0"></Error>
    <form @submit.prevent="login">
      <div class="input-group">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="your email address..."
          v-model="email">
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="your password..."
          v-model="password">
      </div>
      <button type="submit" class="btn primary">Login</button>
    </form>
  </div>
</template>

<script>
import Error from '@/components/Error.vue'
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    Error
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('login', localStorage.getItem('username'))
      this.$router.push('/')
    }
  }
}
</script>
