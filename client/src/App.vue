<template>
  <div id="app" class="bg-color">
    <Navbar></Navbar>
    <b-container fluid>
      <b-row>
        <b-col cols="3">
          <b-row class="pt-5 mb-5 border" style="height: 100vh;" align="right">
            <b-col cols="12">
             <router-link to="/question/collection">
             <h4 class="border-bottom mb-3" v-if="isLogin"> <i class="fas fa-user-circle"></i> My Question </h4>
             </router-link>
             <router-link to="/question">
             <h4 class="border-bottom mb-3"><i class="fas fa-globe-asia"></i> Explore </h4>
             </router-link>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="9">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapState } from 'vuex';

export default {
  computed: mapState(['isLogin']),
  components: {
    Navbar
  },
  created() {
    if (localStorage.token) {
      this.$store.commit("SAVELOGIN");
    }
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
.bg-color {
  background-color: #eff0f1;
  min-height: 100vh;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
* {
  font-family: 'Montserrat', sans-serif;
}
</style>
