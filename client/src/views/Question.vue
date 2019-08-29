<template>
  <div class="question-detail-container">
    <div class="question-detail">
      <div class="question-vote">
        <div class="up">
          <i class="fas fa-chevron-up"></i>
        </div>
        <div class="vote-number">
          <span>{{ this.$store.state.question.vote }}</span>
        </div>
        <div class="down">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <div class="question-content">
        <div class="title">
          <h2>{{ this.$store.state.question.title }}</h2>
        </div>
        <div class="question-content-isi">
          <p>{{this.$store.state.question.content}}</p>
          <div class="user">
            <p><i class="fas fa-user"></i> {{ this.$store.state.question.user }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="answer-container">
      <div class="answer-header">
        <h3>Answer :</h3>
        <button class="btn secondary" @click.prevent="toggleFormAnswer">Answer this question</button>
      </div>
      <FormAnswer v-if="isAnswer"></FormAnswer>
      <Answer
        v-for="answer in this.$store.state.question.answers"
        :key="answer._id"
        :content="answer.content"
        :user="answer.user.username"
        :vote="getVote(answer.upVote.length - answer.downVote.length)">
      </Answer>
    </div>
  </div>
</template>

<script>

import Answer from '@/components/Answer.vue'
import FormAnswer from '@/components/FormAnswer.vue'

export default {
  name: 'Question',
  components: {
    Answer,
    FormAnswer
  },
  data() {
    return {
      isAnswer: false
    }
  },
  methods: {
    toggleFormAnswer() {
      this.isAnswer ? this.isAnswer = false : this.isAnswer = true
    },
    getVote(n) {
      if(n > 0) {
        return '+' + n
      }else if(n < 0) {
        return '-' + n
      }else{
        return n
      }
    }
  },
  mounted() {
    this.$store.dispatch('questionDetail', this.$route.params.id)
  }
}
</script>

<style scoped>
.answer-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid #9b9177;
  margin-bottom: 20px;
}
</style>