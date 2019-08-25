<template>
  <router-link :to="'/question/'+question._id" class="question--list__item">
    <div class="vote--count expression">
      <p class="vote--count__label expression__label">Vote</p>
      <p class="vote--count__number expression__number">{{ question.upvotes.length - question.downvotes.length }}</p>
    </div>
    <div class="answer--count expression">
      <p class="answer--count__label expression__label">Answer</p>
      <p class="answer--count__number expression__number">{{ question.answers.length }}</p>
    </div>
    <div class="question--content">
      <div class="question__title">
        <h1>{{ question.title }}</h1>
      </div>
      <div class="question__description">
        <p>{{ question.description }}</p>
      </div>
      <div class="question__tag tag--container">
        <span class="tag" v-for="(tag,index) in question.tags" :key="index">
          {{ tag }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['question'],
  data(){
    return {

    }
  }
}
</script>

<style>

</style>