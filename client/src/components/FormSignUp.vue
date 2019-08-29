<template>
  <div class="signup">
    <b-modal id="signup" title="BootstrapVue" size="xl">
      <div class="header" slot="modal-header">
        <h4>Sign Up</h4>
      </div>
      <div class="body d-flex align-items-center">
        <div class="col-6 d-flex justify-content-center">
          <div
            class="image-login align-self-center d-flex align-items-center"
            :style="{backgroundImage: 'url(https://svgshare.com/i/EiV.svg)'}"
          >
            <h3>Looking for answer ...</h3>
          </div>
        </div>
        <form class="col-6">
          <!-- ============= username -->
          <label for>
            <i class="fas fa-user-alt mr-3"></i> Username:
          </label>
          <b-form-input placeholder="Input username" v-model="formSignup.username"></b-form-input>
          <!-- ============= email -->
          <label for>
            <i class="fas fa-envelope mr-3"></i> Email:
          </label>
          <b-form-input placeholder="Input email" v-model="formSignup.email"></b-form-input>
          <!-- ============= password -->
          <label for>
            <i class="fas fa-unlock mr-3"></i> Password:
          </label>
          <b-form-input placeholder="Input password" v-model="formSignup.password" type="password"></b-form-input>
        </form>
      </div>
      <div class="foter" slot="modal-footer">
        <button class="btn btn-primary mr-2" @click="signup()">SignUp</button>
        <button class="btn btn-danger" @click="cancel()">Cancel</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formSignup: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    cancel() {
      this.$bvModal.hide("signup");
    },
    signup() {
      this.$store
        .dispatch("signup", this.formSignup)
        .then(data => {
          console.log("Successfuly registered!");
          this.$bvModal.hide("signup");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.image-login {
  width: 76%;
  height: 290px;
  background-size: cover;
}

h3 {
  position: relative;
  top: 70px;
}

.header h4,
h3,
button,
label {
  font-family: "Oswald";
}
label {
  margin-top: 7px;
}
</style>