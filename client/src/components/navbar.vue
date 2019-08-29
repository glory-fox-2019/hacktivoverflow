<template>
<div>
  <nav class="navbar navbar-light bg-light">
  <a class="navbar-brand"><img src="../assets/logo.png"  width="300px"></a>
  <form class="form-inline">
    <button class="btn my-2 my-sm-0" 
    style="background-color:rgb(255, 116, 0); color:white" 
    type="submit" 
    @click="logout"
    v-if="this.$store.state.isLogin">
        Logout
    </button>
  </form>
</nav>
</div>
</template>

<script>
export default {
    methods: {
        logout () {
            localStorage.clear()
            this.$store.commit('CHANGE_LOGIN_STATUS',false)
        }
    }

}
</script>

<style>

</style>