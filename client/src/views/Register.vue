<template>
  <div id="login" class="auth">
      <div class="card">
        <div class="auth--banner">
          <p>Hacktiv<br><b>Overflow</b></p>
        </div>
        <div class="auth--form">
          <form>
            <h2>Register</h2>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Email">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password">
            </div>
            <p>Already have an account? <router-link to="/login">Login</router-link></p>
            <button type="submit" class="btn">Submit</button>
          </form>
          <div class="auth--divider">
            <p>Or</p>
          </div>
          <div class="auth--form--google">
            <G-Signin-Button></G-Signin-Button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import GSigninButton from '@/components/GSigninButton';
export default {
  name: 'register',
  components: {GSigninButton},
}
</script>

<style>

</style>