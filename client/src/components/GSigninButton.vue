<template>
  <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
</template>

<script>
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
  directives: {
    GoogleSignInButton
  },
  data: () => ({
    clientId: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style>

</style>