<template>
  <b-row class="justify-content-center align-items-center" style="height: 100vh;">
    <b-col cols="5">
        <h1 class="text-center"><b>Ask Question</b></h1>
        <b-form @submit.prevent="addQuestion()">
            <label class="mt-2"><b>Title</b></label>
            <b-input v-model="question.title" type="text"></b-input>
            <label class="mt-2"><b>Content</b></label>
            <wysiwyg v-model="question.content"/>
            <label class="mt-2"><b>Tags</b></label>
            <tags-input v-model="question.tags" element-id="tags"></tags-input>
            <b-button v-if="!isLoading" variant="primary" type="submit" class="btn-block mt-3">Ask Question</b-button>
            <b-button v-else class="form-control btn-primary btn-block mt-3" disabled>
                <b-spinner small></b-spinner>
                Loading...
            </b-button>
        </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data(){
    return {
      question: {
        title: '',
        content: '',
        tags: [],
      },
      isLoading: false,
    }
  },
  methods: {
    addQuestion(){
      this.isLoading = true;

      this.$store.dispatch('addQuestion', this.question)
        .then(() => {
          this.isLoading = false;
          this.$router.push('/')
        })
        .catch(console.log)
    }
  }

}
</script>

<style>

</style>