<template>
  <nav class="shadow-lg p-3 bg-white rounded sticky-top">
    <div class="logo" v-if="!$store.state.isLogin">
      <img src="../assets/logo.png" alt="Hactivoverflow logo" />
    </div>
    <div v-else class="container d-flex align-items-center justify-content-between">
      <!-- <h1>{{$store.state.isLogin}}</h1> -->
      <div class="logo">
        <img src="../assets/logo.png" alt="Hactivoverflow logo" />
      </div>
      <div class="d-flex justify-content-around align-items-center">
        <!-- <img src="../assets/logo.png" alt="Hactivoverflow logo" /> -->
        <router-link to="/questions" style="width:100%" class="mr-4">
          <button class="btn">Main Page</button>
        </router-link>
        <button class="btn" @click.prevent="logout()">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      login: false,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit('changelogin', false)
      this.$router.push('/home');
    }
  },
  created(){

  }
};
</script>

<style scoped>
nav {
  position: sticky;
  background-color: whitesmoke;
}
button {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  border: 2px solid black;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  transition: 0.5s all;
}
button:hover {
  color: whitesmoke;
  border: 2px solid #0b2d54;
  background-color: #0b2d54;
  transition: 0.5s all;
}
</style>