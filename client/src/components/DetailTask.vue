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
        <button>Edit</button>
        <div class="d-flex">
          <a>{{Moment(question.createdAt).fromNow()}}</a>
          <button>{{this.user.name}}</button>
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
      },
    };
  },
  computed: {
    ...mapState(['question'])
  },
  created() {
    this.$store.dispatch('getOneQuestion', this.$route.params.id)
  }
}
</script>

<style scoped>
.detail {
  display: flex;
  margin: 1rem;
};
i {
  height: 100px !important;
}

</style>