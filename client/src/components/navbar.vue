<template>
    <nav class="navbar is-primary is-fixed-top" >
        <div class="navbar-brand">
            <a @click="toHome()" class="navbar-item">
                <img src="../assets/logo.png" alt="logo"/>
                Ask The Map!
            </a>
        </div>

        <!-- search -->
        <div class="navbar-menu">
            <div class="navbar-end">
                
            </div>
            <div class="navbar-end">
                <!-- auth  -->
                 <b-navbar-item v-if="!$store.state.loggedUser" tag="div">
                    <div class="buttons">
                        <a @click="signingUp()" class="button is-light">
                            Sign up
                        </a>
                        <a class="button is-light" @click="logingIn()">
                            Log in
                        </a>
                    </div>
                </b-navbar-item>

                <!-- modal signin -->
                <b-modal :active.sync="isLogingIn" :width="300">
                    <form @submit.prevent="login()">
                        <div class="modal-card" style="width: auto">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Login</p>
                            </header>
                            <section class="modal-card-body">
                                <b-field label="Email">
                                    <b-input
                                        v-model="loginEmail"
                                        type="email"
                                        placeholder="Your email"
                                        required>
                                    </b-input>
                                </b-field>

                                <b-field label="Password">
                                    <b-input
                                        v-model="loginPassword"
                                        type="password"
                                        password-reveal
                                        placeholder="Your password"
                                        required>
                                    </b-input>
                                </b-field>
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button" type="button" @click="loginCancel()">Close</button>
                                <button class="button is-primary" type="submit">Login</button>
                            </footer>
                        </div>
                    </form>
                </b-modal>

                <!-- modal signup -->

                <b-modal :active.sync="isSigningUp" :width="300">
                    <form @submit.prevent="signUp()">
                        <div class="modal-card" style="width: auto">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Sign Up</p>
                            </header>
                            <section class="modal-card-body">
                                <b-field label="Username">
                                    <b-input
                                        v-model="signUpName"
                                        type="name"
                                        placeholder="Username"
                                        required>
                                    </b-input>
                                </b-field>
                                <b-field label="Email">
                                    <b-input
                                        v-model="signUpEmail"
                                        type="email"
                                        placeholder="Your email"
                                        required>
                                    </b-input>
                                </b-field>

                                <b-field label="Password">
                                    <b-input
                                        v-model="signUpPassword"
                                        type="password"
                                        password-reveal
                                        placeholder="Your password"
                                        required>
                                    </b-input>
                                </b-field>
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button" type="button" @click="signUpCancel()">Close</button>
                                <button class="button is-primary" type="submit" >Sign Up</button>
                            </footer>
                        </div>
                    </form>
                </b-modal>

                <!-- dropdown -->
                <b-dropdown   
                    v-if="$store.state.loggedUser"                 
                    v-model="navigation"
                    position="is-bottom-left"
                    aria-role="menu">
                    <a
                        class="navbar-item"
                        slot="trigger"
                        role="button">
                        <span><i class="fas fa-bars"></i></span>
                    </a>

                    <b-dropdown-item v-if="name" custom aria-role="menuitem">
                        Logged as <b>{{name}}</b>
                    </b-dropdown-item>
                    <hr class="dropdown-divider">
                    <div @click.prevent="toHome()">
                        <b-dropdown-item value="home" aria-role="menuitem">
                            <b-icon icon="home"></b-icon>
                            Home
                        </b-dropdown-item>

                    </div>
                    <b-dropdown-item value="blog"  aria-role="menuitem">
                        <b-icon icon="book-open"></b-icon>
                        My Posts
                    </b-dropdown-item>
                    <hr class="dropdown-divider" aria-role="menuitem">
                    <div @click.prevent="logout()">
                        <b-dropdown-item   value="logout" aria-role="menuitem">
                            <b-icon icon="logout"></b-icon>
                            Logout
                        </b-dropdown-item>

                    </div>
                </b-dropdown>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'
export default {
    name: 'navbar',
    computed:{
        name(){
            return localStorage.getItem('name')
        },
    },
    data() {
        return {
            navigation: 'home',
            isLogingIn : false,
            isSigningUp : false,
            loginEmail: '',
            loginPassword: '',
            signUpName: '',
            signUpEmail: '',
            signUpPassword: '',
        }
    },
    methods: {
        //buttons
        loginCancel(){
            this.isLogingIn = false
        },
        logingIn(){
            this.isLogingIn = true
        },
        signUpCancel(){
            this.isSigningUp = false
        },
        signingUp(){
            this.isSigningUp = true
        },
        toHome(){
            this.$router.push('/')
        },
        //functions
        signUp(){
            let payload = {
                name: this.signUpName,
                email: this.signUpEmail,
                password: this.signUpPassword
            }
            axios({
                url: `${this.$store.state.server}/users/register`,
                method: 'POST',
                data: payload,
            })    
            .then(({ data }) => {                
                this.loginEmail = this.signUpEmail
                Swal.fire({
                    title: 'Successfully registered, please log in',
                    type: 'success'
                })
                this.isSigningUp = false
                this.isLogingIn = true
                this.signUpName = ""
                this.signUpEmail = ""
                this.signUpPassword = ""
            })
            .catch(err=>{
                Swal.fire({
                    title: 'Oops, Something went Wrong!',
                    type: 'error'
                })
            })
        },
        login(){
            let payload = {
                email: this.loginEmail,
                password: this.loginPassword
            }
            axios({
                url: `${this.$store.state.server}/users/login`,
                method: 'POST',
                data: payload,
            })    
            .then(({ data }) => {
                Swal.fire({
                    title: 'Successfully logged-in',
                    type: 'success'
                })
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('userId', data.userId)
                localStorage.setItem('name', data.name)
                this.$store.commit('login', data.userId)
                this.$store.dispatch('getWatchedTags')
                this.loginEmail = ""
                this.loginPassword = ""
                this.isLogingIn = false
            })
            .catch(err=>{
                Swal.fire({
                    title: 'Oops, Something went Wrong!',
                    type: 'error'
                })
            })
        },
        logout(){
            localStorage.clear()
            this.$store.commit('logout')
        },
    }
}
</script>

<style>

</style>