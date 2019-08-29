<template>
<div cols="5" style="height: 60%; min-width: 50%;">
    <h4 style="text-align: center;">Tanyain Aja</h4>
    <b-card
      style="width: 100%; height: 100%;"
      class="mb-2">
        <b-form @submit.prevent="signIn" style="width: 100%; height: 80%; display:flex; flex-direction: column; align-content: center;">
            <label for="email" style="font-size: 15px;">Email</label>
            <b-input v-model="form.email" type="email" id="email" aria-describedby="password-help-block" class="mb-3"></b-input>
            <label for="password" style="font-size: 15px;">Password</label>
            <b-input v-model="form.password" type="password" id="password" aria-describedby="password-help-block"></b-input>
            <b-form-text id="password-help-block">
                Your password at least have 6 characters long
            </b-form-text>
            <div style="display:flex; margin-top: 10px; justify-content: center;">
                <b-button variant="outline-success" type="submit"  style="width: 40%;">Login</b-button>
            </div>
            <div style="display: flex; min-width: 25%; margin-top: 20px; justify-content: space-around; color: #969592;">
                <span>Don't have an account ?</span><a href="#" v-b-modal.modalregister style="text-decoration: underline;">Register here</a>
            </div>
        </b-form>
      <b-modal id="modalregister" size="md" title="Register:">
        <b-form-group
          label="Email:"
          label-for="input-1"
          style="width: 100%">
          <b-form-input
            id="input-1"
            type="email"
            required
            v-model="register.email"
            placeholder="Input Email here.."></b-form-input>
        </b-form-group>
       <b-form-group
          label="Username:"
          label-for="input-2"
          style="width: 100%">
          <b-form-input
            id="input-2"
            type="text"
            required
            v-model="register.username"
            placeholder="Input Username here.."></b-form-input>
        </b-form-group>
       <b-form-group
          label="Password:"
          label-for="input-3"
          style="width: 100%">
          <b-form-input
            id="input-3"
            type="password"
            required
            v-model="register.password"
            placeholder="Input Password here.."></b-form-input>
        </b-form-group>
          <template slot="modal-footer">
              <b-button variant="success" style="width: 20%;" @click.prevent="signUp">Register</b-button>
          </template>
      </b-modal>
    </b-card>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            register: {
                email: '',
                password: '',
                username: ''
            }
        }
    },
    methods: {
        signIn () {
            this.$store.dispatch('signIn', this.form)
        },
        signUp () {
            this.$store.dispatch('signUp', this.register)
            this.$bvModal.hide('modalregister')
        }
    }
}
</script>

<style>

</style>