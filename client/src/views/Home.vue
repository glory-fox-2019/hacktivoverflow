<template>
  <div class="container">
    <div class="card">
      <div class="title">
        <span>
          Newest Question
        </span>
      </div>
      <div class="question--list">
        <Question-List-Item v-for="question in questions" :key="question._id" :question="question"></Question-List-Item>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionListItem from "@/components/QuestionListItem";
import { mapState,mapActions } from "vuex"

export default {
  components: {QuestionListItem},
  data() {
    return {

    }
  },
  created(){
    this.fetchQuestions()
  },
  computed: {
    ...mapState(['questions'])
  },
  methods: {
    ...mapActions(['fetchQuestions'])
  }
}
</script>

<style>

</style>