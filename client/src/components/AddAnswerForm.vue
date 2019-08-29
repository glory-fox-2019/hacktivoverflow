<template>
  <b-row>
    <h4>Your Answer</h4>
    <br>
    <wysiwyg v-model="content"/>
    <b-button @click="giveAnswer()" variant="outline-primary" class="mt-3 btn-block btn-sm">Give Answer</b-button>
  </b-row>
</template>

<script>
export default {
  name: 'AnswerForm',
  data() {
    return {
      content: '',
    }
  },
  methods: {
    giveAnswer(){
      this.$store.dispatch('addAnswer', {
        questionId: this.$route.params.id,
        content: this.content,
      })
      .then(() => {
        this.$store.dispatch('fetchAnswers', this.$route.params.id)
        this.content = ''
      })
      .catch(console.log)
    }
  }
}
</script>

<style>

</style>