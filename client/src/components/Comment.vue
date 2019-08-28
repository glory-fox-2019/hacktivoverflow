<template>
  <div class="comment col-12 col-md-9">
    <div class="comment--list">
      <div class="comment--list__item" v-for="comment in comments" :key="comment._id">
        <span class="comment--list__item--text">{{comment.text}}</span>
        <span class="comment--list__item--detail"> - {{ comment.user.name }} | {{ new Date(comment.createdAt  ) | moment("from", "now") }}</span>
      </div>
    </div>
    <div class="comment--action">
      <form @submit.prevent="addComment">
        <input type="text" placeholder="Add comment..." v-model="add.comment">
        <button>Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import ax from '@/config/axios'

export default {
  data () {
    return {
      add: {
        comment: ''
      }
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
    }
  }
}
</script>

<style>

</style>
