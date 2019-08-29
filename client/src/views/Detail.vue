<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item>
      <v-list-item-content>
          <v-list-item-title> <h2>{{question.title}} </h2></v-list-item-title>
          <v-list-item-title> <p>{{question.content}} </p></v-list-item-title>
          <v-list-item-subtitle> {{answers.length}} Answers</v-list-item-subtitle>
          <v-list-item-subtitle> posted by: {{question.userId.name}} </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-content>
          </v-list-item-content>
          <v-list-item-content>
          </v-list-item-content>
          <v-list-item-content>
          <i class="far fa-thumbs-up ok" @click="up(question)"></i>
            {{question.upVote.length - question.downVote.length}}
        <i class="far fa-thumbs-down ok" @click="down(question)"></i>
          </v-list-item-content>
    </v-list-item>
    
    <v-divider></v-divider>
    
    <v-list-item>
      <v-list-item-content>
          <AddAnswer/>
          <AnswerList v-for="(answer, index) in answers" :key="index" :jawaban="answer"/>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
const url = 'http://localhost:3000'
import AnswerList from '../components/AnswerList'
import AddAnswer from '../components/AddAnswer'

export default {
    name: 'detailQuestion',
    data () {
        return {
            // question: {},
        }
    },
    computed: mapState([
        'answers',
        'question'
    ]),
    components: {
        AnswerList,
        AddAnswer
    },
    methods: {
        up(input) {
            let id = input._id
            let token = localStorage.getItem('token')
            axios.patch(`${url}/questions/${id}/upvote`, {}, {headers: {token}})
            .then(({data}) => {
                this.$store.dispatch('getQuestionDetail', id)
            })
            .catch(console.log)
        },

        down(input) {
            let id = input._id
            let token = localStorage.getItem('token')
            axios.patch(`${url}/questions/${id}/downvote`, {}, {headers: {token}})
            .then(({data}) => {
                this.$store.dispatch('getQuestionDetail', id)
            })
            .catch(console.log)
        }
    },
    created() {
        let id = this.$route.params.id
        this.$store.dispatch('getQuestionDetail', id)
        this.$store.dispatch('getAnswers', id)       
    }
}
</script>

<style>
.ok{
    cursor:grab
}

</style>