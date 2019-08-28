<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="primary" @click="login">Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const url = "http://localhost:3000";

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    email: "",
    password: ""
  }),
  methods: {
    login() {
      axios
        .post(`${url}/users/login`, {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userData", data.user._id);
          this.$store.commit("CHANGELOGIN", true);
          this.$router.push("/home/all");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Invalid email/password",
          });
        });
    }
  }
};
</script>