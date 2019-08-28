<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item>
      <v-list-item-content>
          <v-list-item-title> <h2>{{question.title}} </h2></v-list-item-title>
          <v-list-item-title> <p>{{question.content}} </p></v-list-item-title>
          <v-list-item-subtitle> {{answers.length}} Answers</v-list-item-subtitle>
          <v-list-item-subtitle> posted by: {{question.userId.name}} </v-list-item-subtitle>
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
            question: {},
        }
    },
    computed: mapState([
        'answers'
    ]),
    components: {
        AnswerList,
        AddAnswer
    },
    created() {
        let id = this.$route.params.id
        let token = localStorage.getItem('token')
        axios.get(`${url}/questions/${id}`, {headers: {token}})
        .then(({data}) => {
            this.question = data
            this.$store.dispatch('getAnswers', data._id)
        })
        .catch(console.log)
    }
}
</script>

<style>

</style>