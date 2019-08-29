<template>
  <div class="ui container">
    <Item :item="question" :type="'questions'" @vote="vote"/>
    <Item
      :item="answer"
      :type="'answers'"
      v-for="answer in question.answers"
      :key="answer._id"
      @vote="vote"
      @edit-answer="editAnswer"
      @remove-a="removeAnswer"
      v-show="answer._id !== answerObj._id || edit === false"
    />
    <div class="ui basic segment" v-if="edit && answered">
      <h2>Edit Answer</h2>
      <ckeditor :editor="editor" v-model="answerObj.content" :config="editorConfig"></ckeditor>
      <button
        class="ui teal button"
        style="margin-top: 1rem;"
        @click="submitAnswer"
      >Post Your Answer</button>
    </div>
    <div class="ui basic segment">
      <div v-if="!edit">
        <h2>Your Answer</h2>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <button class="ui teal button"
          style="margin-top: 1rem;"
          @click="submitAnswer"
        >Post Your Answer</button>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Item from '@/components/Item.vue'
import backend from '@/api/backend'
import { mapState } from 'vuex'
export default {
  name: 'QuestionPage',
  components: {
    Item
  },
  created () {
    this.$store.dispatch('getQ', this.$route.params.id)
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      edit: false,
      answerObj: {}
    }
  },
  computed: {
    ...mapState([
      'question', 'isLogin'
    ]),
    notOwner () {
      return this.question.owner.email !== localStorage.getItem('email') && this.isLogin
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    answered () {
      return !!this.question.answers.find(
        el => el.owner.email === localStorage.getItem('email')
      )
    }
  },
  methods: {
    vote (obj) {
      const { route, type, id } = obj
      if (this.isLogin) {
        backend
          .patch(
            `/${route}/${type}/${id}`,
            {},
            {
              headers: {
                accesstoken: localStorage.getItem('accesstoken')
              }
            }
          )
          .then(() => {
            this.$store.dispatch('getQ', this.$route.params.id)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    submitAnswer () {
      if (!this.edit) {
        backend
          .post(
            `/answers/${this.$route.params.id}`,
            {
              content: this.editorData
            },
            {
              headers: {
                accesstoken: localStorage.getItem('accesstoken')
              }
            }
          )
          .then(() => {
            this.$store.dispatch('getQ', this.$route.params.id)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        backend
          .patch(`/answers/${this.answerObj._id}`, this.answerObj, {
            headers: {
              accesstoken: localStorage.getItem('accesstoken')
            }
          })
          .then(() => {
            this.edit = false
            this.$store.dispatch('getQ', this.$route.params.id)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    removeAnswer (id) {
      backend
        .delete(`/answers/${this.$route.params.id}/${id}`, {
          headers: {
            accesstoken: localStorage.getItem('accesstoken')
          }
        })
        .then(() => {
          this.$store.dispatch('getQ', this.$route.params.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editAnswer (obj) {
      this.edit = true
      this.answerObj = obj
    }
  }
}
</script>

<style>
</style>
