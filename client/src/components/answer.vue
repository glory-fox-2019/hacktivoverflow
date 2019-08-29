<template>
  <div class="card flex-row mt-3" style="width:100%;height:200px;">
    <!-- <router-link :to="'/question/'+question._id" > -->
      <div class="ml-2 mr-2 mt-4" style="width:18%">
          <div @click="upvote(theanswer)"><i class="fas fa-arrow-up"></i></div>
          <p>{{totalVotes()}}</p>
          <div @click="downvote(theanswer)"><i class="fas fa-arrow-down"></i></div>
          </div>
    <div class="card-body">
      <h5 class="card-title">{{theanswer.title}}</h5>
      <p class="card-text text-justify">{{theanswer.description}}</p>
      <p>{{theanswer.UserId.username}}</p>
      <p>{{getDate(theanswer.createdAt)}}</p>
      <!-- <p>on  -->
    </div>
    <!-- </router-link> -->
  </div>
</template>

<script>
export default {
  name: "answer",
  props: {
    theanswer: Object
  },
  methods: {

    totalVotes(){

      return this.theanswer.upvotes.length - this.theanswer.downvotes.length

    },

    upvote(answer) {
      let id = answer._id
      let QuestionId = answer.QuestionId
      let payload = {id,QuestionId}
      this.$store.dispatch("upvoteAnswer", payload);
    },
    downvote(answer) {
      let QuestionId = answer.QuestionId
      let id = answer._id
      let payload = {QuestionId,id}
      this.$store.dispatch("downvoteAnswer", payload);
    },

    getDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
