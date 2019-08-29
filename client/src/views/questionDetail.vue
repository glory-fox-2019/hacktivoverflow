<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-8">
        <div class="card flex-row mt-3" style="width:100%;">
          <div class="ml-2 mr-2 mt-4" style="width:18%">
            <div @click="upvote(question._id)">
              <i class="fas fa-arrow-up"></i>
            </div>
            <p>{{totalVotes}}</p>
            <div @click="downvote(question._id)">
              <i class="fas fa-arrow-down"></i>
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{question.title}}</h5>
            <p class="card-text text-justify">{{question.description}}</p>
            <p>by {{question.UserId.username}}</p>
            <p>{{getDate(question.createdAt)}}</p>
            <!-- <p>on  -->
            <!-- <button class="btn btn-warning">answer</button> -->
          </div>
        </div>
        <div class="mt-4">
          <button @click="isAnswerModalActive=true" class="btn btn-warning">click to answer</button>
        </div>
        <!-- <H4>answers</H4> -->
        <div class="row">
          <answer :theanswer="answer" v-for="answer in answers" :key="answer._id"></answer>
        </div>
      </div>
      <sidebar></sidebar>
    </div>

    <!-- Modal untuk menjawab pertanyaan -->
    <b-modal title="Submit your question" id="modal-create" v-model="isAnswerModalActive">
      <!-- <h4>Input your answer for this question</h4> -->
      <b-form @submit.prevent="createAnswer" id="createAnswerForm">
        <b-form-group label="Enter your title" label-for="title">
          <b-form-input type="text" v-model="formCreateAnswer.title" placeholder="title" required></b-form-input>
        </b-form-group>
        <b-form-group label="question" label-for="description">
          <textarea
            v-model="formCreateAnswer.description"
            placeholder="question"
            class="form-control"
            rows="3"
          ></textarea>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button
          variant="primary"
          data-dismiss="modal"
          type="submit"
          form="createAnswerForm"
        >Confirm</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import answer from "../components/answer.vue";
import sidebar from "../components/sidebar.vue";

export default {
  name: "questionDetail",
  components: {
    answer,
    sidebar
  },
  data() {
    return {
      theQuestion: {},
      isAnswerModalActive: false,
      formCreateAnswer: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    upvote(QuestionID) {
      let id = QuestionID;
      this.$store.dispatch("upvoteQuestion", id);
    },
    downvote(QuestionID) {
      let id = QuestionID;
      this.$store.dispatch("downvoteQuestion", id);
    },
    // totalVotes(question) {
    //   return question.upvotes.length - question.downvotes.length;
    // },
    getDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    getUsername() {
      return this.theQuestion.UserId.username;
    },

    createAnswer() {
      this.formCreateAnswer.QuestionId = this.$route.params.id;
      this.$store.dispatch("createAnswer", this.formCreateAnswer);
      this.isAnswerModalActive = false;
    }
  },
  mounted: function() {
    let id = this.$route.params.id;
    this.$store.dispatch("getOneQuestion", id).then(() => {
      this.theQuestion = this.$store.state.theQuestionDetail;

    });
    this.$store.dispatch("getAnswer", id);
    // this.question()
    // theQuestion = this.$store.state.theQuestionDetail
    // let id = this.$route.params.id
    // this.$store.dispatch("getAnswer", id)
    // // let id = this.$route.params.id;
    // this.$store.dispatch("getOneQuestion", id)
    // .then(()=>{
    // let qq = this.$store.state.theQuestionDetail
    // console.log(qq)
    // console.log(this.theQuestion)
    // })
  }
  ,
  computed: {
    question() {
      return this.$store.state.theQuestionDetail;
    },
    answers() {
      return this.$store.state.answers;
    },
    totalVotes() {
      let question = this.$store.state.theQuestionDetail
      // let question = this.theQuestion

      return question.upvotes.length - question.downvotes.length
    }
  }
};
</script>

<style>
</style>
