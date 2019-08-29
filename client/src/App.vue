<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

    <!-- ===== Modal Register ===== -->
    <div>
      <b-modal ref="modal-register" id="modal-register" centered title="Register" hide-footer >
        <div class="modal-body">
          <div class="container-fluid">
            <div class="d-flex justify-content-center">
              <form @submit.prevent="registerUser()" id="registerForm" class="form d-flex flex-column">
                <input v-model="register.name" class="login-register" type="text" placeholder="Input your name">
                <input v-model="register.email" class="login-register" type="text" placeholder="Input your email">
                <input v-model="register.password" class="login-register" type="password"
                  placeholder="Input your password">
                <button type="submit" class="modal-button btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <!-- ===== Modal Login ===== -->
    <div>
      <b-modal class="modal" ref="modal-login" id="modal-login" centered title="Login" hide-footer >
        <div class="modal-body">
          <div class="container-fluid">
            <div class="d-flex justify-content-center">
              <form @submit.prevent="loginUser()" class="form d-flex flex-column">
                <input v-model="login.email" class="login-register" type="text" placeholder="Input your email">
                <input v-model="login.password" class="login-register" type="password"
                  placeholder="Input your password">
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <!-- ===== Modal Create ===== -->
    <div>
      <b-modal size="xl" class="modal" ref="modal-create" id="modal-create" title="Create" hide-footer hide-header>
        <div class="modal-body">
          <div class="container-fluid">
            <h5 class="mb-4">Create Post</h5>
            <form @submit.prevent="createQuestion()" class="form d-flex flex-column">
              <input v-model="create.title" type="text" placeholder="Input title" class="form">
              <tags-input element-id="tags"
              v-model="tags"
              class="form">
              <!-- :existing-tags="available"
              :typeahead="true"> -->
              </tags-input>
              <b-form-textarea
                id="textarea"
                v-model="create.content"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
                class="form">
              </b-form-textarea>
        
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            
          </div>
        </div>
      </b-modal>
    </div>

    <!-- ===== Modal Loading ===== -->
    <div>
      <b-modal ref="modal-loading" id="modal-loading" centered title="Login" hide-footer hide-header no-close-on-backdrop>
        <div class="modal-body">
          <div class="text-center">
            <a class="loading-font"> Please Wait </a>
          </div>
          <div class="text-center">
            <br>
            <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="warning" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="info" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="dark" type="grow" label="Spinning"></b-spinner>
          </div>
        </div>
      </b-modal>
    </div>

    <div class="container-fluid" style="height: 100%; width: 100%; border-radius: 25px;">
      <div class="mt-3 fluid" style="margin-left:7%; margin-right:7%">
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand><img @click.prevent="toHome()" alt="Forum Box" class="nav-item img-fluid pl--5" src="./assets/askfully.png" style="height:50px"></b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">  
              <b-nav-item @click.prevent="triggerRegister" v-if="!$store.state.isLogin" v-b-modal.modal-register> <span class="header-font">Register</span></b-nav-item>
              <b-nav-item @click.prevent="triggerLogin" v-if="!$store.state.isLogin" v-b-modal.modal-login><span class="header-font">Login</span></b-nav-item>
              <b-nav-item @click.prevent="triggerCreate" v-if="$store.state.isLogin" v-b-modal.modal-create> <span class="header-font mr-3">&#9997; Create Post </span> </b-nav-item>
              <b-nav-item-dropdown right v-if="$store.state.isLogin">
                <!-- Using 'button-content' slot -->
                <template slot="button-content"><span class="header-font">User</span></template>
                <b-dropdown-item @click.prevent="changeView('/mypost')"><span class="nav-item">Profile</span></b-dropdown-item>
                <b-dropdown-item @click.prevent="logoutUser"><span class="nav-item">Logout</span></b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>

      <div class="row mt-2">
        <div class="col-sm-1"></div>
        <div v-if="$store.state.isLogin" class="col-sm-2">
          <div v-if="$store.state.isLogin" class="card">
            <ul class="list-group list-group-flush text-left">
              <li @click.prevent="changeView('/')" class="nav-item list-group-item">&#127757; Discover</li>
              <li @click.prevent="changeView('/mypost')" class="nav-item list-group-item">&#128100; My Post</li>
              <!-- <li @click.prevent="changeView('/create')" class="nav-item list-group-item">&#9997; Create Post</li> -->
            </ul>
          </div>

          <div v-if="$store.state.isLogin" class="card">
            <div class="card-body">
              <h5 class="card-title">Available Tag</h5>
              <button v-for="tag in $store.state.tagList" :key="tag._id" type="button" @click="tagFind(tag._id)" class="btn btn-primary m-2" style="width:50%; height: 50%">{{tag.name}} <span class="badge"></span></button>
            </div>
          </div>
          
        </div>
        <div  v-if="$store.state.isLogin" class="col-sm-8">
          <router-view/>
        </div>

        <div  v-if="!$store.state.isLogin" class="col-sm-10">
          <router-view/>
        </div>
        <!-- <div class="col-sm-2">
          <div v-if="$store.state.isLogin" class="card">
            <div class="card-body">
              <h5 class="card-title">Available Tag</h5>
              <button v-for="tag in $store.state.tagList" :key="tag._id" type="button" @click="tagFind(tag._id)" class="btn btn-primary m-2">{{tag.name}} <span class="badge"></span></button>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ax from '../config/axios'
import Swal from 'sweetalert2'
import VoerroTagsInput from '@voerro/vue-tagsinput';

export default {
  components: {
    'tags-input': VoerroTagsInput
  },
  data(){
    return {
      register: {
        name: '',
        email: '',
        password: ''
      },
      login: {
        email: '',
        password: ''
      },
      tags: [],
      create: {
        title: '',
        content: '',
        tags: [],
      },
      tagList : []
    }
  },
  methods: {
    changeView(page){
      this.$router.push(page)
    },
    toHome(){
      this.$router.push('/')
    },
    triggerRegister(){
      this.$refs['modal-register'].show()
    },
    triggerLogin(){
      this.$refs['modal-login'].show()
    },
    triggerCreate(){
      this.$refs['modal-create'].show()
    },
    createQuestion(){
      let arr = []
      for (let i=0; i<this.tags.length; i++){
        arr.push(this.tags[i].value)
      }
      this.create.tags = arr 
      ax({
        url: '/questions/create',
        method: 'post',
        data: this.create,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.$refs['modal-create'].hide()
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Question Created',
            showConfirmButton: false,
            timer: 1500
          })
          this.$store.dispatch('getAllQuestion')
          this.$store.dispatch('myQuestion')
          this.$store.dispatch('listTag')
        })
        .catch((err)=>{
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message)}`,
          })
        })
    },
    registerUser(){
      ax({
        url: '/users/register',
        method: 'post',
        data: this.register
      })
        .then(({data})=>{
          this.$refs['modal-register'].hide()
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Register success, please login',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message).substr(24)}`,
          })
          console.log(err)
        })
    },
    loginUser(){
      ax({
        url: `/users/login`,
        method: 'post',
        data: this.login
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)          
          localStorage.setItem('_id', data._id)
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Login success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$refs['modal-login'].hide()
          this.$store.commit('GETLOGINEMAIL', data.email)
          this.$store.commit('GETLOGINID', data._id)
          this.$store.commit('CHANGELOGIN', true)
          this.$store.dispatch('getAllQuestion')

        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message)}`,
          })
          console.log(err)
        })
    },
    logoutUser(){
      localStorage.clear()
      this.dataDefault()
      this.$store.commit('CHANGELOGIN', false)
      this.$router.push('/')
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Logout success',
        showConfirmButton: false,
        timer: 1500
      })
    },
    listTag(){
      ax({
        url: `/tags/findAll`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.tagList = data
          console.log(data)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    tagFind(id){
      ax({
        url: `/tags/find/${id}`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.$store.commit('GETTAGID', data)
          this.$router.push(`/tag/${id}`)
          
        })
        .catch((err)=>{
          console.log(err)
        })

    },
    dataDefault(){
      this.register.name = '',
      this.register.email = '',
      this.register.password = ''
      this.login.email = ''
      this.login.password = ''
    }
  },
  created(){
    this.$store.state.hidePage = true
    if (localStorage.getItem('token')){
      this.$store.commit('CHANGELOGIN', true)
      this.$store.commit('GETLOGINEMAIL', localStorage.getItem('email'))
      this.$store.commit('GETLOGINID', localStorage.getItem('_id'))
      this.$store.dispatch('listTag')
    }
  }
}
</script>

<style scoped>
  /* 
    font-family: 'Righteous', cursive;
    font-family: 'Permanent Marker', cursive;
    font-family: 'Oswald', sans-serif;
    font-family: 'Roboto Condensed', sans-serif; 
  */
  h5{
    font-family: 'Oswald', sans-serif;
  }
  .header-font{
    font-family: 'Righteous', cursive !important;
    cursor: pointer !important;
    transition: 0.2s !important;
    color: white !important;
  }
  .header-font:hover{
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    color: #6AC9EC;
  }
  .nav-item {
    font-family: 'Righteous', cursive !important;
    cursor: pointer !important;
    transition: 0.2s !important;
    color: black !important;
  }
  .nav-item:hover {
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
    font-weight: bold;
    font-size: 15px;
    color: #6AC9EC;
  }
  .login-register{
    border: none;
    background-color: transparent;
    outline: none;
    text-align: center;
    border-bottom: 1px solid rgb(165, 165, 165);
    margin-bottom: 10px;
    font-family: 'Roboto Condensed', sans-serif;
  }
  .form{
    border: none !important;
    background-color: transparent !important;
    outline: none !important;
    text-align: left !important;
    border-bottom: 1px solid rgb(165, 165, 165) !important;
    margin-bottom: 10px !important;
    font-family: 'Roboto Condensed', sans-serif !important;
  }
  /* #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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

  #nav a.router-link-exact-active {
    color: #42b983;
  } */
</style>
