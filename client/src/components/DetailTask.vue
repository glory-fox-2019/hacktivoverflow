<template>
<div class="task-detail">
  <div class="ml-3">
    <h3>{{question.title}}</h3>
    <!-- {{question}} -->
    <div>
      <p >asked by: {{this.user.name}}</p>
    </div>
    <hr>
  </div>
  <div class="detail d-flex align-item-center">
    <div class="col-ms-2 pl-4 pr-5 d-flex row" style="height:50px;">
      <i @click.prevent="upvote" class="fas fa-chevron-up" style="font-size:30px; cursor:pointer;"></i>
      <a style="font-size:30px">{{question.upVote.length}}</a>
      <i @click.prevent="downvote" class="fas fa-chevron-down" style="font-size:30px; cursor:pointer;"></i>
    </div>
    <div class="col-ms-10">
      <p>{{question.content}}</p>
      <div class="d-flex justify-content-between">
        <div>
          <button class="mr-2" @click="editQuestion" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Edit</button>
          <a @click.prevent="removeQuestion">Delete</a>
        </div>
        <div class="d-flex">
          <a>{{Moment(question.createdAt).fromNow()}}</a>
          <a class="mr-2 ml-4">by: {{this.user.name}}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="tag-answer mt-5 ml-3">
    <h5>{{answer.length}} Answer</h5>
    <hr>
  </div>
  
  <!-- comment -->  
  <router-view/>

  <hr>
  <div class="answer mt-5 ml-5">
    <h5>Your Answer</h5>
    <form @submit.prevent="createAnswer">
      <div class="form-group mt-4">
        <textarea v-model="formAnswer.content" class="form-control" rows="3"></textarea>
        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Answer</button>
    </form>
  </div>
  <!-- modal edit answerr -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit Question</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Title:</label>
              <input v-model="newQuestion.title" type="text" class="form-control" id="recipient-name">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Your new question:</label>
              <textarea v-model="newQuestion.content" class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button @click="submitUpdateQuestion" type="button" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex';
import Moment from 'moment';

export default {
  data() {
    return {
      Moment,
      user: {
        name: localStorage.name,
        id: localStorage.id,
      },
      formAnswer:{
        content: '',
        questionId: this.$route.params.id
      },
      newQuestion: {
        id: '',
        title: '',
        content: '',
      },
    };
  },
  computed: {
    ...mapState(['question', 'answer']),
  },
  methods: {
    createAnswer() {
      this.$store.dispatch('createAnswer', this.formAnswer);
      this.$store.dispatch('getAnswer', this.formAnswer.questionId);
    },
    removeQuestion() {
      // console.log(this.question._id, '<=============')
      this.$store.dispatch('removeQuestion', this.question._id);
      this.$store.dispatch('getOneQuestion', this.$route.params.id);
      this.$router.push('/myquestion');
    },
    editQuestion() {
      this.newQuestion.id = this.question._id;
      this.newQuestion.title = this.question.title;
      this.newQuestion.content = this.question.content;
    },
    submitUpdateQuestion() {
      this.$store.dispatch('submitUpdateQuestion', this.newQuestion);
      this.$store.dispatch('getOneQuestion', this.$route.params.id);
      $('#exampleModal').modal('hide');      
    },
    upvote() {
      this.$store.dispatch('upvote', this.user.id);
    },
    downvote() {
      this.$store.dispatch('downvote', this.user.id);
    },
  },
  created() {
    this.$store.dispatch('getOneQuestion', this.$route.params.id);
    this.$store.dispatch('getAnswer', this.$route.params.id);
  },
  
};
</script>

<style scoped>
.detail {
  display: flex;
  margin: 1rem;
};
i {
  height: 100px !important;
};
.answer {
  padding-left: 4rem;
}
</style>