<template>
  <v-form>
    <v-text-field v-model="title" filled label="Title" color="blue"></v-text-field>
    <v-textarea
      background-color="amber lighten-4"
      color="orange orange-darken-4"
      label="Question"
      v-model="content"
    ></v-textarea>
    <v-btn color="primary" @click="AddQ">ASK</v-btn>
    <br />
  </v-form>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
const url = 'http://34.87.27.57'
export default {
  name: 'addQuestion',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    AddQ () {
      let token = localStorage.getItem('token')
      axios
        .post(
          `${url}/questions`,
          {
            title: this.title,
            content: this.content
          },
          { headers: { token } }
        )
        .then(({ data }) => {
          this.$store.dispatch('getQuestions')
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `Title and Question must be filled`
          })
        })
    }
  }
}
</script>

<style>
</style>
