<template>
  <form class="container" @submit.prevent="createQuestion">
    <h3>Create your question</h3>
    <div class="form-group  mt-5">
      <label>Title</label>
      <input v-model="question.title" type="text" class="form-control">
      <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Your Question</label>
      <textarea v-model="question.content" class="form-control" rows="3"></textarea>
      <small class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label>Tags</label>
      <input v-model="question.tags" type="text" class="form-control">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <button type="submit" class="btn btn-primary mt-4">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      question: {
        title: '',
        content: '',
        tags: '',
      },
    };
  },
  methods: {
    createQuestion() {
      this.$store.dispatch('createQuestion', this.question);
    },
  },
};
</script>

<style>
.container {
  margin-top: 10rem;
  width: 45rem;
}
</style>