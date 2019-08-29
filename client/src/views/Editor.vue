<template>
  <v-form>
    <v-text-field v-model="title" filled label="Title" color="blue" v-if="page == 'question'"></v-text-field>
    <v-textarea
      background-color="amber lighten-4"
      color="orange orange-darken-4"
      label="Question"
      v-model="content"
    ></v-textarea>
    <v-btn color="primary" v-if="page == 'question'" @click="saveQ">Save Changes</v-btn>
    <v-btn color="primary" v-if="page == 'answer'" @click="saveA">Save Changes</v-btn>
    <br />
  </v-form>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Swal from 'sweetalert2'
const url = "http://localhost:3000";
export default {
  name: "Editor",
  props: ["id"],
  computed: mapState(["page", "editId"]),
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    saveQ() {
      let token = localStorage.getItem("token");
      axios
        .patch(
          `${url}/questions/${this.editId}`,
          {
            title: this.title,
            content: this.content
          },
          { headers: { token } }
        )
        .then(({ data }) => {
          this.$store.dispatch("getQuestions");
          this.$router.push("/home/all");
          Swal.fire({
            position: "center",
            type: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        });
    },

    saveA() {
        let token = localStorage.getItem("token");
      axios
        .patch(
          `${url}/answers/${this.editId}`,
          {
            content: this.content
          },
          { headers: { token } }
        )
        .then(({ data }) => {
          this.$store.dispatch('getAnswers', data.questionId)
          this.$router.push(`/home/${data.questionId}`);
          Swal.fire({
            position: "center",
            type: "success",
            title: "Answer updated",
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  },

  created() {
    let token = localStorage.getItem("token");
    if (this.page == "question") {
      axios
        .get(`${url}/questions/${this.editId}`, { headers: { token } })
        .then(({ data }) => {
          this.title = data.title;
          this.content = data.content;
        })
        .catch(console.log);
    } else if (this.page == "answer") {
      axios
        .get(`${url}/answers/${this.editId}/one`, { headers: { token } })
        .then(({ data }) => {
            console.log(data)
          this.content = data.content;
        })
        .catch(console.log)
    }
  }
};
</script>

<style>
</style>