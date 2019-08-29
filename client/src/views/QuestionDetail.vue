<template>
  <div class="my-container container row" v-if="dataReady">
    <div class="col-sm-3 d-flex justify-content-end" style="margin-top:50px; padding-right:0px; ">
      <Sidebar />
    </div>
    <div class="col-sm-9" style="margin-top: 50px;">
      <div class="row">
        <div
          class="col-2 d-flex justify-content-start flex-column"
          style="margin-top:30px;font-size:20px"
        >
          <div>
            <i
              style="cursor: pointer"
              @click.prevent="clickUpvoteQuestion(question._id)"
              class="fas fa-chevron-up"
            ></i>
          </div>
          <div>{{totalVote}}</div>
          <div>
            <i
              style="cursor: pointer"
              @click.prevent="clickDownvoteQuestion(question._id)"
              class="fas fa-chevron-down"
            ></i>
          </div>
        </div>
        <div class="col-sm-10 px-0">
          <div>
            <div
              class="d-flex justify-content-start title"
              style="border-bottom: 1px solid rgba(0,0,0,0.6)"
            >
              <p
                style="margin-bottom: 5px; font-size: 28px; font-weight: 600; color: rgba(0,0,0,0.8)"
              >{{question.title}}</p>
            </div>
            <div class="d-flex justify-content-start content">
              <p style="font-size: 18px; text-align:left">{{question.content}}</p>
            </div>
            <div class="row" style="margin-left: 0px; width:29em">
              <div
                class="d-flex justify-content-between"
                v-for="(tag, i) in question.tags"
                :key="i"
                style="margin-right: 12px; font-size: 12px; color: rgba(0,0,0,0.6);"
              >
                <p class="tags">{{tag}}</p>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <div class="flex-column" style="font-size: 14px; color: rgba(0,0,0,0.6)">
                <div>
                  <p style="margin-bottom: 5px; text-align: right">{{question.UserId.username}}</p>
                </div>
                <div>
                  <p style="text-align: right">{{question.createdAt | moment}}</p>
                </div>
              </div>
            </div>
            <div
              class="d-flex justify-content-between border-bottom border-top border-secondary py-3"
              style="font-size: 20px; border-bottom: 1px solid rbga(0,0,0,0.8)"
            >
              <div>
                <div v-if="question.UserId._id != userData._id">
                  <i
                    @click="$bvModal.show('modal-answer')"
                    style="cursor: pointer;"
                    class="fas fa-plus"
                  >Answer</i>
                </div>
                <div
                  v-else
                  style="font-size: 14px; padding-top:5px;"
                >you cant answer your own question</div>
              </div>
              <div>{{question.AnswerId.length}} Answer</div>
            </div>
            <div
              class="d-flex justify-content-end"
              style="margin-top: 20px;"
              v-for="(answer,i) in question.AnswerId"
              :key="i"
            >
              <!-- answers -->
              <div class="col-12 d-flex px-0 border-bottom border-secondary">
                <div class="col-3 px-0">
                  <div>
                    <i
                      style="cursor: pointer"
                      @click.prevent="clickUpvoteAnswer(answer._id)"
                      class="fas fa-chevron-up"
                    ></i>
                  </div>
                  <div>{{answer.upvote.length - answer.downvote.length}}</div>
                  <div>
                    <i
                      style="cursor: pointer"
                      @click.prevent="clickDownvoteAnswer(answer._id)"
                      class="fas fa-chevron-down"
                    ></i>
                  </div>
                </div>
                <div class="col-9 px-0">
                  <div>
                    <p
                      style="text-align: justify; color: rgba(0,0,0,0.6); font-size: 15px;"
                    >{{answer.content}}</p>
                  </div>
                  <div class="flex-column" style="font-size: 13px">
                    <div
                      style="margin-bottom: 5px; text-align: right; cursor: pointer"
                      v-if="answer.UserId._id == userData._id"
                    >
                      <i
                        class="far fa-edit"
                        @click.prevent="clickEditAnswer({content: answer.content, id: answer._id})"
                      ></i> |
                      <i @click.prevent="clickDeleteAnswer(answer._id)" class="far fa-trash-alt"></i>
                    </div>
                    <div>
                      <p style="margin-bottom: 5px; text-align: right">{{answer.UserId.username}}</p>
                    </div>
                    <div>
                      <p style="margin-bottom: 5px; text-align: right">{{answer.createdAt | moment}}</p>
                    </div>
                  </div>
                  <div v-if="edited">
                    <form action class="form-group" @submit.prevent="submitEdit">
                      <h5>edit asnwer</h5>
                      <textarea
                        class="form-control"
                        name
                        id
                        cols="30"
                        rows="5"
                        v-model="newAnswer.content"
                        placeholder="enter a new answer..."
                      ></textarea>
                      <div class="d-flex justify-content-between">
                        <small style="padding-right: 10px">*click edit icon to cancel edit answer</small>
                        <button
                          style="margin-top: 10px; justify-content: end;"
                          type="button"
                          class="btn btn-outline-warning"
                          @click.prevent="submitEditAnswer"
                        >Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-answer"
      hide-backdrop
      content-class="shadow"
      title="Answer"
      ok-title="Submit Answer"
      @ok="submitAnswer"
    >
      <form @submit.stop.prevent="submit">
        <div class="form-group" style="margin-bottom: 0px">
          <b-form-textarea
            id="textarea-large"
            size="lg"
            placeholder="Enter your asnwer..."
            rows="8"
            v-model="newAnswer.content"
          ></b-form-textarea>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import moment from "moment";
import { mapState } from "vuex";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      newAnswer: {
        id: "",
        content: ""
      },
      edited: false,
      editAnswer: ""
    };
  },
  computed: {
    ...mapState(["question", "userData", "dataReady"]),
    totalVote() {
      let upvote = this.question.upvote ? this.question.upvote.length : 0;
      let downvote = this.question.downvote ? this.question.downvote.length : 0;
      return upvote - downvote;
    }
  },
  methods: {
    submitAnswer() {
      this.$store.dispatch("createAnswer", {
        content: this.newAnswer.content,
        UserId: localStorage.id,
        QuestionId: this.question._id
      });
      this.newAnswer = {};
    },
    submitEditAnswer() {
      console.log(this.question);
      this.$store.dispatch("editAnswer", {
        answer: this.newAnswer,
        question: this.question
      });
      this.newAnswer = {};
      this.edited = false;
    },
    clickEditAnswer(payload) {
      this.newAnswer.content = payload.content;
      this.newAnswer.id = payload.id;
      this.edited = !this.edited;
    },
    clickDeleteAnswer(answerId) {
      console.log(answerId);
      this.$store.dispatch("deleteAnswer", {
        answerId,
        question: this.question
      });
    },
    clickUpvoteQuestion(questionId) {
      this.$store.dispatch("upvoteQuestion", {
        question: this.question,
        user: this.userData
      });
    },
    clickDownvoteQuestion(questionId) {
      this.$store.dispatch("downvoteQuestion", {
        question: this.question,
        user: this.userData
      });
    },
    clickUpvoteAnswer(answerId) {
      console.log(answerId);
      console.log("masuk up");
      this.$store.dispatch("upvoteAnswer", {
        answer: answerId,
        user: this.userData
      });
    },
    clickDownvoteAnswer(answerId) {
      console.log(answerId);
      console.log("masuk down");
      this.$store.dispatch("downvoteAnswer", {
        answer: answerId,
        user: this.userData
      });
    }
  },
  watch: {
    userState() {
      this.userData;
    },
    "$route.params.id": function() {
      this.$store.dispatch("fetchQuestion", this.$route.params.id);
    }
  },
  mounted() {
    this.$store.dispatch("fetchQuestion", this.$route.params.id);
  },
  filters: {
    moment: function(date) {
      return moment(date).format("lll");
    }
  }
};
</script>

<style scoped>
.my-container {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
}

.tags {
  background-color: rgb(187, 170, 170);
  border-radius: 4px;
  box-shadow: 3px 4px 5px -3px rgba(0, 0, 0, 0.75);
  padding: 5px;
  padding-right: 15px;
  padding-left: 15px;
}
</style>