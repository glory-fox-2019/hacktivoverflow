<template>
<b-col cols="5" style="height: 60%;">
    <b-card
      style="width: 100%; height: 100%;"
      class="mb-2">
        <b-form @submit.prevent="signIn" style="width: 100%; height: 80%; display:flex; flex-direction: column; justify-content: center;">
            <label for="email" style="font-size: 15px;">Email</label>
            <b-input v-model="form.email" type="email" id="email" aria-describedby="password-help-block" class="mb-3"></b-input>
            <label for="password" style="font-size: 15px;">Password</label>
            <b-input v-model="form.password" type="password" id="password" aria-describedby="password-help-block"></b-input>
            <b-form-text id="password-help-block">
                Your password atleast have 6 characters long
            </b-form-text>
            <div style="display:flex; margin-top: 10px; justify-content: center;">
                <b-button variant="outline-success" type="submit"  style="width: 40%;">Login</b-button>
            </div>
        </b-form>
    </b-card>
</b-col>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        signIn () {
            this.$store.dispatch('signIn', this.form)
        }
    }
}
</script>

<style>

</style>