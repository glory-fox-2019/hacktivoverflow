<template>
  <div class="content__vote" v-if="upvotes && downvotes">
    <div class="vote--action">
      <button :class="{ 'active--up' : upvoteActive }" @click="toggleVote('up')"><span class="mdi mdi-menu-up"></span></button>
    </div>
    <div class="vote--count">
      <span>{{ totalVote }}</span>
    </div>
    <div class="vote--action">
      <button :class="{ 'active--down' : downvoteActive }" @click="toggleVote('down')"><span class="mdi mdi-menu-down"></span></button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ax from '@/config/axios'
export default {
  data () {
    return {
      vote: {
        value: 0
      }
    }
  },
  props: ['type', 'upvotes', 'downvotes', 'idquestion', 'idanswer'],
  created () {

  },
  methods: {
    toggleVote (status) {
      if (status === 'up') {
        if (this.vote.value === 0) this.vote.value = 1
        else if (this.vote.value === -1) this.vote.value = 1
        else this.vote.value = 0
      } else {
        if (this.vote.value === 0) this.vote.value = -1
        else if (this.vote.value === 1) this.vote.value = -1
        else this.vote.value = 0
      }
      this.updateVote()
    },
    updateVote () {
      let voteType

      if (this.vote.value === 1) voteType = 'upvote'
      else if (this.vote.value === -1) voteType = 'downvote'
      else if (this.vote.value === 0) voteType = 'netralvote'

      let url
      if (this.type === 'question') url = '/question/' + this.idquestion + '/' + voteType
      else if (this.type === 'answer') url = '/question/' + this.idquestion + '/answer/' + this.idanswer + '/' + voteType

      ax.patch(url, null, {
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          this.$store.commit('UPDATE_VOTE', { type: this.type, voteType, iduser: this.user._id, idanswer: this.idanswer })
        })
        .catch(({response}) => {
          this.$swal({
            type: 'error',
            title: 'Error!',
            text: response.data.error
          })
        })
    }
  },
  watch: {

  },
  computed: {
    ...mapState(['user']),
    totalVote () {
      return this.upvotes.length - this.downvotes.length
    },
    upvoteActive () {
      if (this.upvotes.indexOf(this.user._id) !== -1) {
        this.vote.value = 1
        return true
      }
      return false
    },
    downvoteActive () {
      if (this.downvotes.indexOf(this.user._id) !== -1) {
        this.vote.value = -1
        return true
      }
      return false
    }
  }
}
</script>

<style>

</style>
