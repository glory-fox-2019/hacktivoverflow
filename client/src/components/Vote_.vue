<template>
  <div class="content__vote" v-if="upvotes && downvotes">
    <div class="vote--action">
      <button :class="{ 'active--up' : vote.value === 1}" @click="toggleVote('up')"><span class="mdi mdi-menu-up"></span></button>
    </div>
    <div class="vote--count">
      <span>{{ totalVote }}</span>
    </div>
    <div class="vote--action">
      <button :class="{ 'active--down' : vote.value === -1}" @click="toggleVote('down')"><span class="mdi mdi-menu-down"></span></button>
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
        value: 0,
        update: false
      }
    }
  },
  props: ['type', 'upvotes', 'downvotes', 'id'],
  created () {
    if (this.user && this.upvotes && this.downvotes) {
      this.fetchVoteUser()
    }
  },
  methods: {
    toggleVote (status) {
      this.vote.oldValue = this.vote.value
      if (status === 'up') {
        if (this.vote.value === 0) this.vote.value = 1
        else if (this.vote.value === -1) this.vote.value = 1
        else this.vote.value = 0
      } else {
        if (this.vote.value === 0) this.vote.value = -1
        else if (this.vote.value === 1) this.vote.value = -1
        else this.vote.value = 0
      }
      this.vote.update = true
    },
    fetchVoteUser () {
      console.log('test', this.upvotes.indexOf(this.user._id))
      if (this.upvotes.indexOf(this.user._id) !== -1) {
        this.vote.value = 1
      } else if (this.downvotes.indexOf(this.user._id) !== -1) {
        this.vote.value = -1
      } else {
        this.vote.value = 0
      }
    }
  },
  watch: {
    'vote.value' (val) {
      if (this.vote.update) {
        if (val === 1) {
          ax({
            url: `${this.type}/${this.id}/upvote`,
            method: 'patch'
          })
            .then(({ data }) => {
              console.log('success upvote')
            })
            .catch(({ response }) => {
              this.vote.update = false
              this.vote.value = this.vote.oldValue
              this.$swal({
                type: 'error',
                title: 'Error!',
                text: response.data.error
              })
            })
        } else if (val === -1) {
          ax({
            url: `${this.type}/${this.id}/downvote`,
            method: 'patch'
          })
            .then(({ data }) => {
              console.log('success downvote')
            })
            .catch(({ response }) => {
              this.vote.update = false
              this.vote.value = this.vote.oldValue
              this.$swal({
                type: 'error',
                title: 'Error!',
                text: response.data.error
              })
            })
        } else {
          ax({
            url: `${this.type}/${this.id}/netralvote`,
            method: 'patch'
          })
            .then(({ data }) => {
              console.log('success netral')
            })
            .catch(({ response }) => {
              this.vote.update = false
              this.vote.value = this.vote.oldValue
              this.$swal({
                type: 'error',
                title: 'Error!',
                text: response.data.error
              })
            })
        }
      }
    },
    user (val) {
      if (val) {
        // this.fetchVoteUser();
      }
    }
  },
  computed: {
    ...mapState(['user']),
    'totalVote' () {
      return this.upvotes.length - this.downvotes.length + this.vote.value
    }
  }
}
</script>

<style>

</style>
