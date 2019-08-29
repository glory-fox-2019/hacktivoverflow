<template>
  <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
</template>

<script>
import ax from '@/config/axios'
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
      ax.post('/user/login/google',{idToken})
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$store.commit('SET_USER', data.payload)
          this.$store.commit('SET_ISLOGIN', true)
        })
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
