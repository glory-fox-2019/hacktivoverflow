<template>
  <div class="answer--list__item" v-if="answer && idquestion">
    <div class="content--left">
      <Vote :type="'answer'" :idquestion="idquestion" :idanswer="answer._id" :upvotes="answer.upvotes" :downvotes="answer.downvotes"></Vote>
    </div>
    <div class="content--right">
      <div class="answer__title content__title">
        <span>{{ answer.title }}</span>
      </div>
      <div class="answer__description content__description">
        {{ answer.description }}
      </div>
      <div class="answer__more--container content__more--container">
        <div class="row">
          <Comment :type="'answer'" :comments="answer.comments" :idquestion="idquestion" :idanswer="answer._id"></Comment>
          <Content-Detail :user="answer.user" :date="answer.createdAt"></Content-Detail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import Vote from '@/components/Vote'
import ContentDetail from '@/components/ContentDetail'

export default {
  components: { Comment, Vote, ContentDetail },
  props: ['answer', 'idquestion']
}
</script>

<style>

</style>
