<template>
  <div id="question" v-if="Object.keys(question).length !== 0">
    <div class="container">
      <div class="card">
        <div class="title">
          <span>
            {{ question.title }}
          </span>
        </div>
        <div class="content">
          <div class="content--left">
            <Vote :type="'question'" :idquestion="question._id" :upvotes="question.upvotes" :downvotes="question.downvotes"></Vote>
          </div>
          <div class="content--right">
            <div class="question__description content__description" v-html="question.description"></div>
            <div class="question__more--container content__more--container">
              <div class="row">
                <Comment :type="'question'" :comments="question.comments" :idquestion="question._id"></Comment>
                <Content-Detail :user="question.user" :date="question.createdAt"></Content-Detail>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="answer" class="card">
        <div class="title">
          <span>Answer</span>
        </div>
        <div class="content">
          <Answer-List-Item v-for="answer in question.answers" :answer="answer" :idquestion="question._id" :key="answer._id"></Answer-List-Item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerListItem from '@/components/AnswerListItem'
import Comment from '@/components/Comment'
import Vote from '@/components/Vote'
import ContentDetail from '@/components/ContentDetail'
import { mapState, mapActions } from 'vuex'

export default {
  components: { AnswerListItem, Comment, Vote, ContentDetail },
  data () {
    return {
      // question: {},
    }
  },
  created () {
    this.fetchQuestion(this.$route.params.id)
  },
  computed: {
    ...mapState(['question'])
  },
  methods: {
    ...mapActions(['fetchQuestion'])
  }
}
</script>

<style>

</style>
