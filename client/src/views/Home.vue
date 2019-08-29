<template>
  <div class="home d-flex justify-content-center align-items-center">
    <div
      class="sign-up d-flex flex-column mt-5 p-4 shadow p-3 mb-5 bg-white rounded"
      v-if="formSignUp"
    >
      <h3 class="action mb-3">Sign Up</h3>
      <form class="form-sign-up" @submit.prevent="signup()">
        <div class="form-label d-flex flex-column justify-content-start align-items-start">
          <label>Username</label>
          <input
            class="form-control"
            type="text"
            v-model="username"
            placeholder="Input username"
            autocomplete="off"
          />
        </div>
        <div
          class="form-label d-flex flex-column justify-content-start align-items-start mt-1"
          autocomplete="off"
        >
          <label>Email</label>
          <input class="form-control" type="email" v-model="email" placeholder="Input email" />
        </div>
        <div
          class="form-label d-flex flex-column justify-content-start align-items-start mt-1"
          autocomplete="off"
        >
          <label>Password</label>
          <input
            class="form-control"
            type="password"
            v-model="password"
            placeholder="Input password"
          />
        </div>
        <div class="d-flex justify-content-center align-items-center mt-3" style="width:100%">
          <button class="btn">Register</button>
        </div>
      </form>
      <div class="goRegister mt-3">
        <h5>
          Already have a account ?
          <a href @click.prevent="tologin()">Click here</a> for sign in
        </h5>
      </div>
    </div>

    <div
      class="sign-up d-flex flex-column mt-5 p-4 shadow p-3 mb-5 bg-white rounded"
      v-if="formSignIn"
    >
      <h3 class="action mb-3">Sign In</h3>
      <form class="form-sign-up" @submit.prevent="signin()">
        <div
          class="form-label d-flex flex-column justify-content-start align-items-start mt-1"
          autocomplete="off"
        >
          <label>Email</label>
          <input class="form-control" type="email" v-model="email" placeholder="Input email" />
        </div>
        <div
          class="form-label d-flex flex-column justify-content-start align-items-start mt-1"
          autocomplete="off"
        >
          <label>Password</label>
          <input
            class="form-control"
            type="password"
            v-model="password"
            placeholder="Input password"
          />
        </div>
        <div class="d-flex justify-content-center align-items-center mt-3" style="width:100%">
          <button class="btn">Login</button>
        </div>
      </form>
      <div class="goRegister mt-3">
        <h5>
          New User ?
          <a href @click.prevent="toregister()">Click here</a> to register for free
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      formSignUp: false,
      formSignIn: true,
      email: "",
      password: "",
      username: ""
    };
  },
  components: {},
  methods: {
    toregister() {
      this.formSignUp = true;
      this.formSignIn = false;
      this.email = "";
      this.username = "";
      this.password = "";
    },
    tologin() {
      this.formSignUp = false;
      this.formSignIn = true;
      this.email = "ardi@ardi.com";
      this.password = "123456";
    },
    signup() {
      let data = {
        email: this.email,
        password: this.password,
        username: this.username
      };
      this.$store.dispatch("signup", data);
      this.email = "";
      this.username = "";
      this.password = "";
      this.formSignUp = false;
      this.formSignIn = true;
    },
    signin() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("signin", data)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          this.$store.commit("changelogin", true);
          console.log(data);
          this.email = "";
          this.username = "";
          this.password = "";
          Swal.fire(
            "Success",
            `Hi ${data.username}, how are you today?`,
            "success"
          );
          this.$router.push("/questions");
        })
        .catch(err => {
          this.email = "";
          this.username = "";
          this.password = "";
          Swal.fire("Invalid", `Wrong username or password`, "error");
        });

      // if (localStorage.getItem("token")) {
      //   this.$router.push("/questions");
      // } else {
      //   console.log("masuk");
      // }
      //
      // .catch(err => {
      //   console.log(err);
      // })
    }
  }
};
</script>

<style scoped>
.home {
  min-height: 80vh;
  /* background-color: grey; */
}
.action {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}
label {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}
button {
  width: 100%;
  border: 2px solid black;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  transition: 0.5s all;
}
button:hover {
  color: whitesmoke;
  border: 2px solid #0b2d54;
  background-color: #0b2d54;
  transition: 0.5s all;
}
h5 {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}
h5 a {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #0b2d54;
  text-decoration: none;
}
h5 a:hover {
  font-family: "Roboto", sans-serif;
  font-weight: bolder;
  color: #1e4a7d;
  text-decoration: none;
}
</style>
