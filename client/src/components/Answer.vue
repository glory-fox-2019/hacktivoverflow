<template>
  <div>
    <b-row align="left" class="border-bottom mt-4" style="min-height: 200px;">
      <b-col cols="2">
        <div class="vote" align="center">
          <i :class="up" @click.prevent="vote('upvotes')"></i>
          <h3 class="mt-4 mb-4">{{answer.upvotes.length - answer.downvotes.length}}</h3>
          <i :class="down" @click.prevent="vote('downvotes')"></i>
        </div>
      </b-col>
      <b-col cols="9">
        <p style="min-height: 100px;" v-if="!edited">{{answer.description}}</p>
        <div v-if="edited">
          <b-form-textarea rows="8" v-model="description"></b-form-textarea>
          <b-button variant="primary" @click.prevent="updateData">Update</b-button>
          <b-button variant="danger" @click.prevent="cancelEdit">Cancel</b-button>
        </div>
        <span>Answered By : {{answer.owner.username}}</span>
      </b-col>
      <b-col cols="1" v-if="isEdit">
        <i
          class="fas fa-ellipsis-v mt-1"
          :id="`popover-answer${answer._id}`"
          style="font-size: 25px; cursor: pointer;"
        ></i>
        <b-popover
          :target="`popover-answer${answer._id}`"
          placement="leftbottom"
          title="Edit Menu"
          triggers="hover focus click"
        >
          <b-button variant="primary" @click.prevent="editForm">Edit</b-button>
        </b-popover>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from '../api/config';

export default {
  props: ['data'],
  data() {
    return {
      up: 'far fa-thumbs-up icon-vote',
      down: 'far fa-thumbs-down icon-vote',
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      description: this.data.description,
      isEdit: false,
      edited: false,
      answer: this.data,
    };
  },
  methods: {
    checkVote(upvotes, downvotes) {
      const id = localStorage.getItem('id');
      if (upvotes.indexOf(id) !== -1) {
        this.up = 'fas fa-thumbs-up icon-vote';
      } else {
        this.up = 'far fa-thumbs-up icon-vote';
      }
      if (downvotes.indexOf(id) !== -1) {
        this.down = 'fas fa-thumbs-down icon-vote';
      } else {
        this.down = 'far fa-thumbs-down icon-vote';
      }
    },
    vote(votetype) {
      const id = this.data._id;
      const { token } = localStorage;
      axios({
        url: `/answer/votes/${id}`,
        method: 'post',
        data: { votetype },
        headers: { token },
      })
        .then(({ data }) => {
          this.answer.upvotes = data.upvotes;
          this.answer.downvotes = data.downvotes;
          this.checkVote(this.answer.upvotes, this.answer.downvotes);
        })
        .catch((err) => {
          const payload = {
            content: err.response.data.message,
            variant: 'danger',
            title: 'vote',
          };
          this.makeToast(payload);
        });
    },
    makeToast(payload) {
      this.$bvToast.toast(payload.content, {
        title: payload.title,
        variant: payload.variant,
        solid: true,
      });
    },
    editForm() {
      this.edited = true;
    },
    cancelEdit() {
      this.edited = false;
    },
    updateData() {
      axios({
        url: `/answer/update/${this.answer._id}`,
        method: 'patch',
        data: { description: this.description },
        headers: { token: this.token },
      })
        .then(({ data }) => {
          this.edited = false;
          this.answer = data;
          const payload = {
            title: 'Answer',
            content: 'Successfully update!',
            variant: 'success',
          };
          this.makeToast(payload);
          const answers = this.$parent.question.answer;
          for (let i = 0; i < answers.length; i++) {
            if (answers[i]._id == data._id) {
              answers[i] = data;
            }
          }
        })
        .catch((err) => {
          const payload = {
            title: 'Answer',
            content: err.response.data.message,
            variant: 'danger',
          };
          this.makeToast(payload);
        });
    },
  },
  created() {
    this.checkVote(this.answer.upvotes, this.answer.downvotes);
    if (this.answer.owner._id == this.id) {
      this.isEdit = true;
    }
  },
};
</script>

<style>
</style>
