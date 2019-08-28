<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <h1>My Questions</h1>
        </v-list-item-title>
        <v-list-item-subtitle>{{myQuestions.length}} Questions</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-content>
          <br>
          <QuestionList v-for="(myQuestion, index) in myQuestions" :key="index" :q="myQuestion">
          </QuestionList>
       
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import QuestionList from '../components/QuestionList'
import { mapState } from 'vuex'

export default {
    name: 'myPage',
    data() {
        return {
            myQuestions: []
        }
    },
    components: {
        QuestionList
    },
    computed: mapState([
        'questions',
        'currentUser'
    ]),
    methods: {

    },
    created() {
        for(let i = 0; i < this.questions.length; i++) {
            if(this.questions[i].userId._id === this.currentUser) {
                this.myQuestions.push(this.questions[i])
            } 
        }  
    }

}
</script>

<style>

</style>