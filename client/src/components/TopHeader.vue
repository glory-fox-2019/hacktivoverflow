<template>
  <div class="header">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/logo.png">
        <h1>Hacktiv Overflow</h1>
      </router-link>
    </div>
    <form>
      <div class="input-group">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search by keywords or tags...">
      </div>
    </form>
    <nav>
      <router-link to="/askquestion" class="btn primary">
        <i class="fas fa-plus-circle"></i> Ask a question
      </router-link>
      <div class="user" v-if="this.$store.state.isLogin">
        <div class="user-image">
          <img src="@/assets/user.jpg">
          <p> {{ this.$store.state.username }} </p>
        </div>
        <router-link to="/user" class="btn secondary">Dashboard</router-link>
        <a href="" class="btn" @click.prevent="logout">Logout</a>
      </div>
      <div class="navbar" v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'topheader',
  methods: {
    logout() {
      this.$store.commit('logout')
    }
  }
}
</script>

