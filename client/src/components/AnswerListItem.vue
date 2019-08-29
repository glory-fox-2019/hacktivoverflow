<template>
  <div class="answer--list__item" v-if="answer && idquestion">
    <div class="content--left">
      <Vote :type="'answer'" :idquestion="idquestion" :idanswer="answer._id" :upvotes="answer.upvotes" :downvotes="answer.downvotes"></Vote>
    </div>
    <div class="content--right">
      <div class="answer--view" v-if="mode === 'view'">
        <div class="content--top">
          <div class="answer__title content__title">
            <span>{{ answer.title }}</span>
          </div>
          <div class="answer__action content__action" v-if="answer.user._id === user._id">
            <a href="javascript:void(0)" @click="loadEditAnswer"><span class="mdi mdi-pencil"></span></a>
            <a href="javascript:void(0)" @click="deleteAnswer"><span class="mdi mdi-delete"></span></a>
          </div>
        </div>
        <div class="answer__description content__description" v-html="answer.description"></div>
        <div class="answer__more--container content__more--container">
          <div class="row">
            <Comment :type="'answer'" :comments="answer.comments" :idquestion="idquestion" :idanswer="answer._id"></Comment>
            <Content-Detail :user="answer.user" :date="answer.createdAt"></Content-Detail>
          </div>
        </div>
      </div>
      <div class="answer--edit" v-if="mode === 'edit'">
        <div class="form">
          <input type="text" class="form__title" placeholder="Title" v-model="edit.title">
          <quill-editor v-model="edit.description"
            ref="myQuillEditor">
          </quill-editor>
          <button @click="editAnswer" class="form__submit">Submit</button>
          <button class="form__cancel" @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import Vote from '@/components/Vote'
import ContentDetail from '@/components/ContentDetail'
import { mapState } from 'vuex'
import ax from '@/config/axios'

export default {
  components: { Comment, Vote, ContentDetail },
  props: ['answer', 'idquestion'],
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      mode: 'view',
      edit: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    loadEditAnswer () {
      this.edit.title = this.answer.title
      this.edit.description = this.answer.description
      this.mode = 'edit'
    },
    editAnswer () {
      ax.put('/question/' + this.idquestion + '/answer/' + this.answer._id, this.edit, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          this.$store.commit('UPDATE_ANSWER', data)
          this.mode = 'view'
        })
        .catch(({ response }) => {
          this.$swal({
            type: 'error',
            title: 'Error!',
            text: response.data.error
          })
        })
    },
    cancelEdit () {
      this.mode = 'view'
    },
    deleteAnswer () {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          ax.delete('/question/' + this.idquestion + '/answer/' + this.answer._id, { headers: { access_token: localStorage.getItem('access_token') } })
            .then(({ data }) => {
              this.$store.commit('DELETE_ANSWER', { id: this.answer._id })
              this.$swal.fire(
                'Deleted!',
                'Your Answer has been deleted.',
                'success'
              )
            })
            .catch(({ response }) => {
              this.$swal({
                type: 'error',
                title: 'Error!',
                text: response.data.error
              })
            })
        }
      })
    }
  }
}
</script>

<style>

</style>
