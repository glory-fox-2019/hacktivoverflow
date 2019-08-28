<template>
  <v-layout row>
          <v-flex md2>
          <i class="far fa-thumbs-up ok" @click="up(jawaban)"></i>
            {{jawaban.upVote.length - jawaban.downVote.length}}
        <i class="far fa-thumbs-down ok" @click="down(jawaban)"></i>
      </v-flex>
    <v-divider vertical></v-divider>
          <v-flex md7>
          <v-list-item-title> <h3> {{jawaban.content}} </h3></v-list-item-title>
          <v-list-item-subtitle> by: {{jawaban.userId.name}}</v-list-item-subtitle>
         </v-flex>
    <v-divider vertical></v-divider>
      <v-flex md2>
          asjdhuoahsd
      </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
const url = "http://localhost:3000"
export default {
    name: 'answer',
    props: ['jawaban'],
    methods: {
        up(input) {
            let id = input._id
            let token = localStorage.getItem('token')
            axios.patch(`${url}/answers/${id}/upvote`, {}, {headers: {token}})
            .then(({data}) => {
                this.$store.dispatch('getAnswers', input.questionId)
            })
            .catch(console.log)
        },

        down(input) {
            let id = input._id
            let token = localStorage.getItem('token')
            axios.patch(`${url}/answers/${id}/downvote`, {}, {headers: {token}})
            .then(({data}) => {
                this.$store.dispatch('getAnswers', input.questionId)
            })
            .catch(console.log)
        }
    }
}
</script>

<style>

</style>