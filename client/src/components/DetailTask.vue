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
      <i class="fas fa-chevron-up" style="font-size:30px"></i>
      <a style="font-size:30px">{{question.upVote}}</a>
      <i class="fas fa-chevron-down" style="font-size:30px"></i>
    </div>
    <div class="col-ms-10">
      <p>{{question.content}}</p>
      <div class="d-flex justify-content-between">
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div class="d-flex">
          <a>{{Moment(question.createdAt).fromNow()}}</a>
          <button>{{this.user.name}}</button>
        </div>
      </div>
    </div>
  </div>
  <div class="tag-answer mt-5 ml-3">
    <h5>0 Answer</h5>
  </div>
  
  <!-- comment -->
  <router-view/> 

  <div class="answer mt-5 ml-5">
    <h5>Your Answer</h5>
    <form @submit.prevent="answer">
      <div class="form-group">
        <textarea v-model="answer" class="form-control" rows="3"></textarea>
        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Answer</button>
    </form>
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
      },
      answer:'',
    };
  },
  computed: {
    ...mapState(['question']),
  },
  methods: {
    answer() {
      this.$store.dispatch('createAnswer', this.answer);
    },
  },
  created() {
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