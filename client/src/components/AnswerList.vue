<template>
  <v-layout row class="forborder">
    <v-flex md2 align-center>
      <i class="far fa-thumbs-up ok" @click="up(jawaban)"></i>
      {{jawaban.upVote.length - jawaban.downVote.length}}
      <i
        class="far fa-thumbs-down ok"
        @click="down(jawaban)"
      ></i>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex md7>
        <p>{{jawaban.content}}</p>
      <v-list-item-subtitle>by: {{jawaban.userId.name}}</v-list-item-subtitle>
    </v-flex>
    
    <v-flex v-if="jawaban.userId._id == currentUser" row wrap>
      <v-btn color="warning" @click="edit(jawaban._id)">Edit</v-btn>
    </v-flex>
    <v-flex v-if="jawaban.userId._id == currentUser" row wrap>
      <v-btn color="error" @click="remove(jawaban)">Delete</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Swal from "sweetalert2";
const url = "http://localhost:3000";
export default {
  name: "answer",
  props: ["jawaban"],
  computed: mapState(["currentUser"]),
  methods: {
    up(input) {
      let id = input._id;
      let token = localStorage.getItem("token");
      axios
        .patch(`${url}/answers/${id}/upvote`, {}, { headers: { token } })
        .then(({ data }) => {
          this.$store.dispatch("getAnswers", input.questionId);
          Swal.fire({
            position: "top-end",
            type: "info",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 500
          });
        })
        .catch(console.log);
    },

    down(input) {
      let id = input._id;
      let token = localStorage.getItem("token");
      axios
        .patch(`${url}/answers/${id}/downvote`, {}, { headers: { token } })
        .then(({ data }) => {
          this.$store.dispatch("getAnswers", input.questionId);
          Swal.fire({
            position: "top-end",
            type: "info",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 500
          });
        })
        .catch(console.log);
    },

    edit(id) {
      this.$store.commit("CHANGEPAGE", "answer");
      this.$store.commit("CHANGEEDITID", id);
      this.$router.push("/home/editor");
    },

    remove(input) {
      let token = localStorage.getItem("token");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`${url}/answers/${input._id}`, { headers: { token } })
            .then(({ data }) => {
              this.$store.dispatch("getAnswers", input.questionId);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            });
        }
      });
    }
  }
};
</script>

<style>
.forborder {
  margin-bottom: 10px;
  border-bottom: 1px solid black;
}
</style>