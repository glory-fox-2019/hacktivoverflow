<template>
  <div id="create-question">
    <div class="container">
      <div class="card">
        <div class="title">
          <h1>Create Question</h1>
        </div>
        <div class="content">
          <div class="form">
            <input type="text" class="form__title" placeholder="Title" v-model="question.title">
            <quill-editor v-model="question.description"
              ref="myQuillEditor">
            </quill-editor>
            <input type="text" class="form__tag" placeholder="Tag" v-model="question.tags.input" @keyup.enter="addTag">
            <div class="tag--container">
              <div class="tag" v-for="(tag,index) in question.tags.value" :key="index">{{ tag }} <a @click="deleteTag(index)">&times;</a></div>
            </div>
            <button type="submit" class="form__submit" @click="createQuestion">Submit</button>
            <button class="form__cancel" @click="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ax from '@/config/axios'

export default {
  data () {
    return {
      question: {
        title: '',
        description: '',
        tags: {
          value: [],
          input: ''
        }
      }
    }
  },
  methods: {
    addTag () {
      if (this.question.tags.input) {
        this.question.tags.value.push(this.question.tags.input)
        this.question.tags.input = ''
      }
    },
    deleteTag (index) {
      this.question.tags.value.splice(index, 1)
    },
    createQuestion () {
      const payload = {
        title: this.question.title,
        description: this.question.description,
        tags: this.question.tags.value
      }
      ax.post('/question', payload, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          this.$store.commit('ADD_QUESTION', data)
          this.$router.push('/')
        })
        .catch(({ response }) => {
          this.$swal({
            type: 'error',
            title: 'Error!',
            text: response.data.error
          })
        })
    },
    cancel () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
