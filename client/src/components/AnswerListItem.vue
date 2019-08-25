<template>
  <div class="answer--list__item">
    <div class="content--left">
      <Vote></Vote>
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
          <Comment :comments="answer.comments"></Comment>
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
  components: {Comment,Vote,ContentDetail},
  props: ['answer'],
}
</script>

<style>

</style>