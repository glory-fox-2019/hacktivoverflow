<template>
  <b-container variant="info" fluid class="p-0 m-0">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <router-link to="/question">
        <b-navbar-brand>HacktivOverflow</b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-5">
          <b-nav-item href="#">Home</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="mr-5 ml-5" style="width: 50%;">
          <b-nav-form style="width:100%;">
            <!-- <b-form-input size="md" class="mr-sm-2" style="width:100%;" placeholder="Search"></b-form-input> -->
          </b-nav-form>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/login">
              <b-button size="md" v-if="!isLogin" variant="outline-primary">login</b-button>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/register">
              <b-button size="md" v-if="!isLogin" variant="success">Register</b-button>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/">
              <b-button size="md" v-if="isLogin" variant="danger" @click.prevent="logout">Logout</b-button>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/create">
              <b-button size="md" v-if="isLogin" variant="success">
                <i class="fas fa-plus"></i> Question
              </b-button>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['isLogin']),
  methods: {
    logout() {
      this.$bvToast.toast('Succesfully Logout', {
        title: 'Logout',
        variant: 'success',
        solid: true,
        autoHideDelay: 5000,
        appendToast: false,
      });
      this.$store.commit('CLEARLOGIN');
    },
  },
};
</script>

<style>
</style>
