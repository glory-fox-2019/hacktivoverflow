<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register form</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="person"
                    type="text"
                    v-model="name"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="email"
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
                    <v-btn color="primary" @click="register">Register</v-btn>
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
    name: "",
    email: "",
    password: ""
  }),
  methods: {
    register() {
      axios
        .post(`${url}/users/register`, {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
         this.$router.push('/login')
          Swal.fire({
            position: "center",
            type: "success",
            title: "Please login to continue",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Please fill all the blanks"
          });
        });
    }
  }
};
</script>