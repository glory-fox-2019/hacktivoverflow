<template>
  <div class="comment col-12 col-md-9">
    <div :class="['comment--list', !expand || comments.length < 3?'comment--list--hidden':'']">
      <div class="comment--list--cover" @click="expandComment" v-if="!expand && comments.length >= 3">
        <p>Click to view more</p>
      </div>
      <div class="comment--list__item" v-for="comment in comments" :key="comment._id">
        <span class="comment--list__item--text">{{comment.text}}</span>
        <span class="comment--list__item--detail">
          - {{ comment.user.name }} | {{ new Date(comment.createdAt  ) | moment("from", "now") }}
          <span v-if="comment.user._id === user._id"> | <a href="javascript:void(0)" @click="deleteComment(comment._id)">Delete</a></span>
        </span>
      </div>
    </div>
    <div class="comment--action">
      <form @submit.prevent="addComment" v-if="Object.keys(user).length > 0">
        <input type="text" placeholder="Add comment..." v-model="add.comment">
        <button>Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import ax from '@/config/axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      add: {
        comment: ''
      },
      expand: false
    }
  },
  props: ['type', 'comments', 'idquestion', 'idanswer'],
  methods: {
    addComment () {
      let url
      if (this.type === 'question') url = '/question/' + this.idquestion + '/comment'
      else if (this.type === 'answer') url = '/question/' + this.idquestion + '/answer/' + this.idanswer + '/comment'

      let payload = {
        text: this.add.comment
      }
      ax.post(url, payload, { headers: { access_token: localStorage.getItem('access_token') } })
        .then(({ data }) => {
          this.expandComment();
          this.add.comment = ''
          this.$store.commit('ADD_COMMENT', { type: this.type, data, idanswer: this.idanswer })
        })
        .catch(({ response }) => {
          this.$swal({
            type: 'error',
            title: 'Error!',
            text: response.data.error
          })
        })
    },
    deleteComment(id){
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
          ax.delete('/comment/'+id, { headers: { access_token: localStorage.getItem('access_token') } })
            .then(({ data }) => {
              this.$store.commit('DELETE_COMMENT', { type: this.type, id, idanswer: this.idanswer })          
              this.$swal.fire(
                'Deleted!',
                'Your Comment has been deleted.',
                'success'
              )
            })
            .catch(({ response }) => {
              this.$swal({
                type: 'error',
                title: 'Error!',
                text: response.data.error,
              });
            });
        }
      })
    },
    expandComment(){
      this.expand = true;
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>
