<template>
  <div id="edit-question">
    <div class="container">
      <div class="card">
        <div class="title">
          <h1>Edit Question</h1>
        </div>
        <div class="content">
          <div class="form">
            <input type="text" class="form__title" placeholder="Title" v-model="edit.title">
            <quill-editor v-model="edit.description"
              ref="myQuillEditor">
            </quill-editor>
            <input type="text" class="form__tag" placeholder="Tag" v-model="edit.tags.input" @keyup.enter="addTag">
            <div class="tag--container">
              <div class="tag" v-for="(tag,index) in edit.tags.value" :key="index">{{ tag }} <a @click="deleteTag(index)">&times;</a></div>
            </div>
            <button type="submit" class="form__submit" @click="editQuestion">Submit</button>
            <button class="form__cancel" @click="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ax from '@/config/axios'

export default {
  data () {
    return {
      edit: {
        title: '',
        description: '',
        tags: {
          value: [],
          input: ''
        }
      },
    }
  },
  methods: {
    addTag () {
      if(this.edit.tags.input){
        this.edit.tags.value.push(this.edit.tags.input)
        this.edit.tags.input = ''
      }
    },
    deleteTag (index) {
      this.edit.tags.value.splice(index,1)
    },
    editQuestion () {
      const payload = {
        title: this.edit.title,
        description: this.edit.description,
        tags: this.edit.tags.value
      }
      ax.put('/question/'+this.id, payload, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          // this.$store.commit('UPDATE_QUESTION', {id: this.id ,data})
          this.$router.push('/')
        })
        .catch(({ response }) => {
          this.$swal({
            type: 'error',
            title: 'Error!',
            text: response.data.error,
          });
        });
    },
    cancel () {
      this.$router.push('/')
    },
    ...mapActions(['fetchQuestion'])
  },
  computed: {
    ...mapState(['question']),
    id () {
      return this.$route.params.id
    }
  },
  created () {
    this.fetchQuestion(this.id)
  },
  watch: {
    question () {
      this.edit.title = this.question.title
      this.edit.description = this.question.description
      this.edit.tags.value = this.question.tags
    }
  }
}
</script>

<style>

</style>
