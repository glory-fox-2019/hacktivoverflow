<template>
  <div class="container">
    <div class="card">
      <div id="newest-question">
        <div class="title">
          <span v-if="!search.input">
            Newest Question
          </span>
          <span v-else>
            Search Question: {{ search.input }}
          </span>
        </div>
        <div class="question--list">
          <div v-if="!search.input">
            <Question-List-Item v-for="question in questions" :key="question._id" :question="question"></Question-List-Item>
          </div>
          <div v-else>
            <Question-List-Item v-for="question in search.questions" :key="question._id" :question="question"></Question-List-Item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionListItem from '@/components/QuestionListItem'
import { mapState, mapActions } from 'vuex'

export default {
  components: { QuestionListItem },
  data () {
    return {

    }
  },
  created () {
    this.fetchQuestions()
  },
  computed: {
    ...mapState(['questions','search'])
  },
  methods: {
    ...mapActions(['fetchQuestions'])
  }
}
</script>

<style>

</style>
