<template>
  <div class="answer--form-create">
    <div class="title">
      <h3>Your Answer</h3>
    </div>
    <div class="form">
      <input type="text" class="form__title" placeholder="Title" v-model="answer.title">
      <quill-editor v-model="answer.description"
        ref="myQuillEditor">
      </quill-editor>
      <button type="submit" class="form__submit" @click="createAnswer">Submit</button>
    </div>
  </div>
</template>

<script>
import ax from '@/config/axios'

export default {
  props: ['idquestion'],
  data () {
    return {
      answer: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    createAnswer () {
      const payload = {
        title: this.answer.title,
        description: this.answer.description
      }
      ax.post('/question/' + this.idquestion + '/answer', payload, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          this.answer.title = ''
          this.answer.description = ''
          this.$store.commit('ADD_ANSWER', data)
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: 'Error!',
            text: err
          })
        })
    }
  }
}
</script>

<style>

</style>
