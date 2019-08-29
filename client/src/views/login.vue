<template>
<div class="container-fluid">
    <div class="justify-content-center align-items-center row" style="height: 50vh;">
        <div class="col-4">
        <div class="card p-4">
            <h3>Welcome to Hacktivoverflow</h3>
            <br>
            <div v-if="loginForm">
                <form @submit.prevent="login">
                <input class="col form-control" placeholder="Email" type="email" v-model="email">
                <input class="mt-3 col form-control" placeholder="Password" type="password" v-model="password">
                <hr>
                <small>Doesn't have an account? Register <a href="#" @click="change()">here</a></small>
                <input type="submit" style="background-color:rgb(255, 116, 0); color:white"  class="btn btn-primary mt-5 w-100" value="LOGIN">       
                </form>
            </div>

            <div v-else>
                <form @submit.prevent="register">
                <input class="mb-3 col form-control" placeholder="Name" type="name" v-model="name">
                <input class="col form-control" placeholder="Email" type="email" v-model="email">
                <input class="mt-3 col form-control" placeholder="Password" type="password" v-model="password">
                <hr>
                <small>Already have an account? Login <a href="#" @click="change()">here</a></small>
                <input type="submit" style="background-color:rgb(255, 116, 0); color:white"  class="btn btn-primary mt-5 w-100" value="REGISTER">       
                </form>
            </div>

        </div>    
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password:'',
            name: '',
            loginForm : true
        }
    },
    methods: {
        change () {
            this.loginForm = !this.loginForm
        }
        ,register () {
            this.$store.dispatch('register', {email: this.email, password: this.password, name: this.name})
            this.email= ''
            this.password= ''
            this.name= ''
            this.loginForm = !this.loginForm
        }

        ,login () {
            this.$store.dispatch('login', {email: this.email, password: this.password})
            this.email= ''
            this.password= ''
            this.$router.push('/')
            if (localStorage.getItem('token')) {
            //     this.$swal.fire({
            //     type: 'success',
            //     title: 'Success!',
            //     text: 'Login Success!'
            // })
             this.$store.dispatch('fetch_question')
            } else{
        //     this.$swal.fire({
        //     type: 'error',
        //     title: 'Oops...',
        //     text: 'Invalid Username/Password!'
        //   })
            }
        }
    }

}
</script>

<style>

</style>