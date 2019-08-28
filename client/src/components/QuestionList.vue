<template>

  <v-layout row>
      <v-flex md2>
          <i class="far fa-thumbs-up ok" @click="up(q)"></i>
            {{q.upVote.length - q.downVote.length}}
        <i class="far fa-thumbs-down ok" @click="down(q)"></i>
      </v-flex>
    <v-divider vertical></v-divider>
          <v-flex md7 @click="showDetail(q._id)" class="clickhover">
          <v-list-item-title> <h3> {{q.title}} </h3></v-list-item-title>
          <v-list-item-subtitle> by: {{q.userId.name}}</v-list-item-subtitle>
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
    name: 'questionlist',
    props: ['q'],
    data() {
        return {
        }
    },
    methods: {
        showDetail(id) {
            this.$router.push(`/home/${id}`)
        },

        up(input) {
            let id = input._id
            let token = localStorage.getItem('token')
            axios.patch(`${url}/questions/${id}/upvote`, {}, {headers: {token}})
            .then(({data}) => {
                this.$store.dispatch('getQuestions')
            })
            .catch(console.log)
        },

        down(input) {
            let id = input._id
            let token = localStorage.getItem('token')
            axios.patch(`${url}/questions/${id}/downvote`, {}, {headers: {token}})
            .then(({data}) => {
                this.$store.dispatch('getQuestions')
            })
            .catch(console.log)
        }
    },
    
}
</script>

<style>
.ok{
    cursor:grab
}


.clickhover:hover{
color: orange;
transition: 0.3s all;
}
</style>