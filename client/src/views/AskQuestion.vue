<template>
  <div class="form">
    <Error v-if="this.$store.state.errors.length > 0"></Error>
    <form @submit.prevent="createQuestion">
      <div class="input-group">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="your question title..."
          v-model="title">
      </div>
      <div class="input-group">
        <label for="content">Content</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          v-model="content">
        </textarea>
      </div>
      <button type="submit" class="btn primary">Create Question</button>
    </form>
  </div>
</template>

<script>
import Error from '@/components/Error.vue'
export default {
  name: 'askQuestion',
  components: {
    Error
  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    createQuestion () {
      this.$store.dispatch('createQuestion', {
        title: this.title,
        content: this.content
      })
    }
  },
  created() {
    if(!localStorage.getItem("token")) {
      this.$router.push('/')
      this.$store.commit('error', ['You must login first'])
    }
  }
}
</script>

<style>

</style>