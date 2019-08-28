<template>
  <v-form>
      <v-text-field
      v-model="title"
      filled
      label="Title"
      color="blue"></v-text-field>
   <v-textarea
      background-color="amber lighten-4"
      color="orange orange-darken-4"
      label="Question"
      v-model="content"
    ></v-textarea>
    <v-btn color="primary" @click="AddQ"> ASK </v-btn><br>
  </v-form>
</template>

<script>
import axios from 'axios'
const url = "http://localhost:3000"
export default {
    name: 'addQuestion',
    data() {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        AddQ() {
            let token = localStorage.getItem('token')
            axios.post(`${url}/questions`, {
                title : this.title,
                content: this.content
            }, {headers: {token}})
            .then(({data}) => {
                this.$store.dispatch('getQuestions')
            })
        } 
    }
}
</script>

<style>

</style>