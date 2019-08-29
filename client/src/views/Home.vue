<template>
  <div class="home">
    <Error v-if="this.$store.state.errors.length > 0"></Error>
    <Question
      v-for="(question, index) in questions"
      :key="index"
      :id="question._id"
      :title="question.title"
      :username="question.user.username"
      :vote="vote(question.upVote.length - question.downVote.length)"
      :answer="question.answer.length">
    </Question>
  </div>
</template>

<script>

import axios from '@/api/server.js'
import Error from '@/components/Error.vue'
import Question from '@/components/Question.vue'

export default {
  name: 'home',
  data() {
    return {
      questions: []
    }
  },
  created() {
    axios.get('/question')
      .then(({data}) => {
        console.log(data)
        this.questions = data
      })
      .catch(err => {
        console.log(err)
      })
  },
  components: {
    Question,
    Error
  },
  methods: {
    vote(n) {
      if(n > 0) {
        return '+' + n
      }else if(n < 0){
        return '-' + n
      }else{
        return n
      }
    }
  }
}
</script>
