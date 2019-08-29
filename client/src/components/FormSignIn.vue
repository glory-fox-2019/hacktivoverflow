<template>
  <div class="signin">
    <b-modal id="signin" title="BootstrapVue">
      <div class="header" slot="modal-header">
        <h4>Sign In</h4>
      </div>
      <div class="body d-flex flex-column">
        <div
          class="image-login align-self-center d-flex align-items-center"
          :style="{backgroundImage: 'url(https://svgshare.com/i/EiU.svg)'}"
        >
          <h3>Hello there ...</h3>
        </div>
        <form @submit.prevent="signin()" id="form-signin">
          <!-- ============= email -->
          <label for>
            <i class="fas fa-envelope mr-2"></i> Email:
          </label>
          <b-form-input placeholder="Input email" v-model="formSignin.email" autocomplete="off"></b-form-input>
          <!-- ============= password -->
          <label for>
            <i class="fas fa-unlock mr-2"></i> Password:
          </label>
          <b-form-input placeholder="Input password" v-model="formSignin.password" type="password"></b-form-input>
        </form>
      </div>
      <div class="foter" slot="modal-footer">
        <button class="btn btn-primary mr-2" type="submit" form="form-signin">SignIn</button>
        <button class="btn btn-danger" @click="cancel()">Cancel</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formSignin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    cancel() {
      this.$bvModal.hide("signin");
    },
    signin() {
      this.$store
        .dispatch("signin", this.formSignin)
        .then(data => {
          this.$bvModal.hide("signin");
          Swal.fire({
            type: "success",
            title: "Signed in successfuly!"
          });
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
  width: 40%;
  height: 245px;
  background-size: cover;
}

h4,
h3 {
  font-family: "Oswald";
}

h3 {
  position: relative;
  left: -90px;
  top: -70px;
}
button,
label {
  font-family: "Oswald";
}
label {
  margin-top: 7px;
}
</style>