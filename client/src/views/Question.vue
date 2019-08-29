<template>
  <div id="question" v-if="Object.keys(question).length !== 0">
    <div class="container">
      <div class="card">
        <div class="card--top">
          <div class="title">
            <span>
              {{ question.title }}
            </span>
          </div>
          <div class="action" v-if="question.user._id === user._id">
            <router-link :to="'/editQuestion/'+question._id"><span class="mdi mdi-pencil"></span></router-link>
            <a href="javascript:void(0)" @click="deleteQuestion"><span class="mdi mdi-delete"></span></a>
          </div>
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
          <!-- Form Answer -->
          <Create-Answer :idquestion="question._id"></Create-Answer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerListItem from '@/components/AnswerListItem'
import CreateAnswer from '@/components/CreateAnswer'
import Comment from '@/components/Comment'
import Vote from '@/components/Vote'
import ContentDetail from '@/components/ContentDetail'
import { mapState, mapActions } from 'vuex'

export default {
  components: { AnswerListItem, Comment, Vote, ContentDetail, CreateAnswer },
  data () {
    return {
      // question: {},
    }
  },
  created () {
    this.fetchQuestion(this.$route.params.id)
  },
  computed: {
    ...mapState(['question','user'])
  },
  methods: {
    ...mapActions(['fetchQuestion']),
    deleteQuestion () {

    }
  }
}
</script>

<style>

</style>
