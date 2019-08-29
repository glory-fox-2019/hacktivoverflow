<template>
  <div class="answer">
    <div class="answer-vote">
      <div class="up">
        <i class="fas fa-chevron-up"></i>
      </div>
      <div class="vote-number">
        <span>{{ vote }}</span>
      </div>
      <div class="down">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    <div class="answer-content">
      <p>{{ content }}</p>
      <div class="user">
        <p><i class="fas fa-user"></i> {{ user }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: ['content', 'user', 'vote']
}
</script>

<style>

</style>