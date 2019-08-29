<template>
  <v-form>
    <v-textarea
      background-color="amber lighten-4"
      color="orange orange-darken-4"
      label="Answer"
      v-model="content"
    ></v-textarea>
    <v-btn color="primary" @click="addAnsw">Reply</v-btn>
    <br />
  </v-form>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
const url = 'http://34.87.27.57'

export default {
  name: 'addAnswer',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    addAnsw () {
      let token = localStorage.getItem('token')
      let questionId = this.$route.params.id
      axios
        .post(
          `${url}/answers/${questionId}`,
          { content: this.content },
          { headers: { token } }
        )
        .then(({ data }) => {
          this.content = ''
          this.$store.dispatch('getAnswers', data.questionId)
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `Answer can't be empty`
          })
        })
    }
  }
}
</script>

<style>
</style>
