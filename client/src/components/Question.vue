<template>
  <div class="question">
    <div class="vote">
      <div class="up" @click="upVoteQuestion(id)">
        <i class="fas fa-chevron-up"></i>
      </div>
      <div class="vote-number">
        <span>{{ vote }}</span>
      </div>
      <div class="down" @click="downVoteQuestion(id)">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    <div class="question-content">
      <div class="question-title">
        <router-link :to="'question/'+id">
          <h2> {{ title }} </h2>
        </router-link>
      </div>
      <div class="question-footer">
        <div class="tag">
          <span>python</span>
          <span>arrays</span>
        </div>
        <div class="user">
          <span>Asked by :</span>
          <span class="username">{{ username }}</span>
        </div>
      </div>
    </div>
    <div class="question-answer">
      <div class="number"> {{ answer }} </div>
      <p>answer</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question',
  props: ['id','title', 'username', 'vote', 'answer'],
  methods: {
    upVoteQuestion(id) {
      this.$store.dispatch('upVoteQuestion', id)
    },
    downVoteQuestion(id) {
      this.$store.dispatch('downVoteQuestion', id)
    },
  }
}
</script>

<style>

</style>
