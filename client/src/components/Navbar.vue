<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" href="#" to="/">Hacktiv Overflow</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <!-- <li class="nav-item active"><a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></li>
      <li class="nav-item"><a class="nav-link">Link</a></li>
      <li class="nav-item"><a class="nav-link">Disabled</a></li> -->
    </ul>
    <form class="form-inline mr-3">
      <input class="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search">
    </form>
    <div>
      <router-link v-if="!isLogin" class="btn btn-light my-2 my-sm-0 mr-3" to="/login" type="submit">Login</router-link>
      <!-- <button v-if="" class="btn btn-primary my-2 my-sm-0 mr-3" to="toRegister" type="submit">Register</button> -->
      <div v-if="isLogin" class="btn-group ml-5 mr-2">
        <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" style="color: silver; border:none;">
        <a>{{this.user.name}}</a>
        <i class="far fa-user-circle ml-2"  style="font-size: 25px; color:silver;"></i>  
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item" type="button">Dashboard</button>
          <router-link to="/ask" class="dropdown-item" type="button">Create Question</router-link>
          <div class="dropdown-divider"></div>
          <a @click.prevent="logout" class="dropdown-item">Logout</a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      user: {
        name: localStorage.name,
      },
    };
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    logout() {
      this.$state.commit('LOGOUT', false);
    }
  },
  created() {
    if(localStorage.token){
      this.$store.commit('ISLOGIN', true)
    }
  }
};
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid silver;
  border-top: 2px solid orange;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
};
.btn-group .btn {
  padding: 0px 0px;
  background-color: transparent;
  color: white;
  border: none;
}
.btn-group .btn:hover {
  text-shadow: 0 0 5px silver;
  color: rgb(236, 236, 236);
  border: none;
};
</style>
