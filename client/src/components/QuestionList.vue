<template>
  <v-layout row>
    <v-flex md2>
      <v-list-item-content>
        <v-list-item-title>Votes</v-list-item-title>
        <v-list-item-subtitle>{{q.upVote.length - q.downVote.length}}</v-list-item-subtitle>
        <v-list-item-title>Answers</v-list-item-title>
        <v-list-item-subtitle>{{replies}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-flex>
    <v-divider vertical></v-divider>
    <v-flex md7 @click="showDetail(q._id)" class="clickhover">
      <v-list-item-title>
        <h3>{{q.title}}</h3>
      </v-list-item-title>
      <v-list-item-subtitle>by: {{q.userId.name}}</v-list-item-subtitle>
    </v-flex>

    <v-flex v-if="q.userId._id == currentUser" row wrap>
      <v-btn color="warning">Edit</v-btn>
    </v-flex>
    <v-flex v-if="q.userId._id == currentUser" row wrap>
      <v-btn color="error" @click="remove(q._id)">Delete</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Swal from 'sweetalert2'
const url = "http://localhost:3000";

export default {
  name: "questionlist",
  props: ["q"],
  data() {
    return {
      replies: 0
    };
  },
  methods: {
    showDetail(id) {
      this.$router.push(`/home/${id}`);
    },

    remove(id) {
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
            .delete(`${url}/questions/${id}`, { headers: { token } })
            .then(({ data }) => {
                this.$store.dispatch('getQuestions')
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            });
        }
      });
    }
  },
  computed: mapState(["answers", "currentUser"]),

  created() {
    this.$store.dispatch("getAnswers", this.q._id);
    this.replies = this.answers.length;
  }
};
</script>

<style>
.clickhover:hover {
  color: orange;
  transition: 0.3s all;
}
</style>