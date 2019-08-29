<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" @click.prevent="toHome">Tanyain Aja</b-navbar-brand>  
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> 
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content"><i class="fas fa-cog"></i></template>
            <b-dropdown-item @click.prevent="createQuestion">Create Question</b-dropdown-item>
            <b-dropdown-item @click.prevent="userQuestion">Your Question</b-dropdown-item>
            <b-dropdown-item @click.prevent="signOut">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    methods: {
        toHome() {
            this.$router.push('/dashboard')
        },
        signOut () {
            this.$store.dispatch('signOut')
        },
        userQuestion () {
            this.$router.push('/user')
        },
        createQuestion () {
            this.$router.push('/createQuestion')
        }
    }
}
</script>

<style>

</style>