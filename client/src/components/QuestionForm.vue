<template>
  <div class="ui container" style="margin-top: 5rem;">
    <div class="ui basic segment">
      <form class="ui large form">
        <h1 class="ui header">{{ edit ? 'Edit Article' : 'Ask Question' }}</h1>
        <div class="ui form">
          <div class="field">
            <label for="title">Title</label>
            <input type="text" placeholder="Title" v-model="newTitle">
          </div>
          <div class="field">
            <label for="content">Content</label>
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
          <div class="ui labels">
            <div class="ui teal label tag" v-for="(tag, i) in newTags" :key="i">
              {{ tag }}
              <i class="close icon" @click="removeTag(tag)"></i>
            </div>
          </div>
          <div
            class="field"
            data-tooltip="Type spacebar to add new tag"
            data-position="left center"
          >
            <label for="tags">Tag</label>
            <input type="text" v-model="newTag" @keyup.enter.space="addTag">
          </div>
          <div class="ui fluid teal button" @click="submitQuestion">
            <p>Submit</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import swal from 'sweetalert'
export default {
  name: 'QuestionForm',
  created () {
    if (!this.$store.state.isLogin) {
      this.$router.push('/login')
      swal('Please login to continue')
    }
    if (this.$route.path === '/edit-question') {
      this.edit = true
      const question = this.$store.state.question
      this.newTitle = question.title
      this.editorData = question.content
      this.newTags = question.tags
    }
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        // The configuration of the editor.
      },
      newTitle: '',
      newTag: '',
      newTags: [],
      edit: this.$route.path === '/edit-question'
    }
  },
  methods: {
    addTag () {
      if (this.newTags.indexOf(this.newTag) < 0 && this.newTag !== ' ') {
        this.newTags.push(this.newTag)
      }
      this.newTag = ''
    },
    removeTag (v) {
      this.newTag = this.newTag.replace(/ /g, '')
      this.newTags = this.newTags.filter(tag => tag !== v)
    },
    submitQuestion () {
      let newQ = {
        title: this.newTitle,
        content: this.editorData,
        tags: this.newTags
      }

      if (this.edit) {
        this.$store.dispatch('updateQ', newQ)
        swal('Question Updated', '', 'success')
      } else {
        this.$store.dispatch('submitQ', newQ)
        swal('Question Posted', '', 'success')
      }

      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
