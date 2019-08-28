<template>
<b-container fluid style="padding: 0; margin: 0;">
    <Navbar></Navbar>
    <b-container style="display: flex; justify-content: center; align-items: center; height: 100vh; margin-top: 40px; padding: 0;">
        <b-col cols="9" style="height: 100vh; display: flex; flex-direction: column;" class="">
            <router-view/>
       </b-col>
    </b-container>
</b-container>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
    components: {
        Navbar
    },
    created() {
        if (localStorage.token) {
            this.$router.push('/dashboard')
            this.$store.state.isLogin = true
        }
        else {
            this.$router.push('/login')
            this.$store.state.isLogin = false
        }
    }
}
</script>

<style scoped>

</style>