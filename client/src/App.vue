<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view class="view" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("LOGIN");
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.view {
  margin-top: 100px;
}
</style>
