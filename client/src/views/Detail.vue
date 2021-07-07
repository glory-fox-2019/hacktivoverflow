<template>
  <div class="detail">
    <!-- ============ QUESTION AREA ================ -->
    <div class="main d-flex mb-4 py-4">
      <div class="votes-control col-2 d-flex flex-column align-items-center">
        <a href class="vote" @click.prevent="upvoteQuestion(question._id)">
          <i class="fas fa-angle-up" :class="{glowUp: checkUpvote}"></i>
        </a>
        <h5 class="m-0 counter-votes">{{question.upVotes.length - question.downVotes.length}}</h5>
        <a href class="vote" @click.prevent="downvoteQuestion(question._id)">
          <i class="fas fa-angle-down" :class="{glowDown: checkDownvote}"></i>
        </a>
      </div>
      <div class="question-info col-10 d-flex flex-column align-items-start">
        <h1>{{question.title}}</h1>
        <small class="text-muted mb-4">
          created {{moment(`${formatDate}`).fromNow()}}, by
          <a href>{{question.userId.username}}</a>
        </small>
        <p class="mb-5">{{question.content}}</p>
        <!-- Tag list -->
        <h5>Tags:</h5>
        <div class="footer align-self-stretch d-flex justify-content-between">
          <div class="tag-list d-flex">
            <TagCard v-for="tag in question.tags" :key="tag._id" :tag="tag" />
          </div>
          <div class="options" v-if="question.userId.email == loggedEmail">
            <button class="btn btn-primary mr-2" v-b-modal.edit-question>Edit</button>
            <button class="btn btn-danger" @click="deleteQuestion(question._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <FormEditQuestion :currentQuestion="question" />
    <!-- ============ ANSWER AREA ================ -->
    <div class="answer-area d-flex flex-column align-items-start">
      <h4 class="reply-title">Reply:</h4>
      <!-- ---------- form answer ----------- -->
      <div class="form-answer align-self-stretch d-flex flex-column" v-if="token">
        <b-form-textarea
          id="textarea"
          placeholder="Your answer..."
          rows="3"
          max-rows="6"
          v-model="formAnswers.content"
        ></b-form-textarea>
        <button
          class="btn btn-primary mt-2 align-self-start"
          @click="replyQuestion(question._id)"
        >Reply</button>
      </div>
      <div class="answers-list mt-4 align-self-stretch">
        <AnswerCard
          v-for="answer in sortedAnswers"
          :key="answer._id"
          :answer="answer"
          class="ansCard"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TagCard from "@/components/TagCard.vue";
import AnswerCard from "@/components/AnswerCard.vue";
import FormEditQuestion from "@/components/FormEditQuestion.vue";
import moment, { locale } from "moment";
import Swal from "sweetalert2";

export default {
  components: {
    TagCard,
    AnswerCard,
    FormEditQuestion
  },
  data() {
    return {
      formAnswers: {
        content: ""
      },
      moment: moment
    };
  },
  methods: {
    replyQuestion(id) {
      this.$store
        .dispatch("replyQuestion", {
          answer: this.formAnswers,
          questionId: id
        })
        .then(answer => {
          this.formAnswers.content = "";
          this.$store.dispatch("fetchOneQuestion", id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteQuestion(id) {
      Swal.fire({
        title: "Delete your question?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch("deleteQuestion", id)
            .then(_ => {
              return this.$store.dispatch("fetchAllQuestions");
            })
            .then(questions => {
              this.$router.push("/");
              Swal.fire(
                "Deleted!",
                "Your question has been deleted.",
                "success"
              );
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    upvoteQuestion(id) {
      this.$store
        .dispatch("upvoteQuestion", id)
        .then(_ => {
          this.$store.dispatch("fetchOneQuestion", id);
          this.$store.dispatch("fetchLoggedUser");
        })
        .catch(err => {
          console.log(err);
        });
    },
    downvoteQuestion(id) {
      this.$store
        .dispatch("downvoteQuestion", id)
        .then(_ => {
          this.$store.dispatch("fetchOneQuestion", id);
          this.$store.dispatch("fetchLoggedUser");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(["question", "user"]),
    sortedAnswers() {
      let answers = this.question.answers;
      if (answers)
        answers.sort(function(a, b) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

      return answers;
    },
    formatDate() {
      if (this.question.createdAt) {
        let dateObject = new Date(this.question.createdAt);
        let month = dateObject.getMonth() + 1;
        let hour = dateObject.getHours();
        let minutes = dateObject.getMinutes();
        let seconds = dateObject.getSeconds();

        if (month.toString().length == 1) {
          month = `0${dateObject.getMonth() + 1}`;
        }
        if (hour.toString().length == 1) {
          hour = `0${dateObject.getHours()}`;
        }
        if (minutes.toString().length == 1) {
          minutes = `0${dateObject.getMinutes()}`;
        }
        if (seconds.toString().length == 1) {
          seconds = `0${dateObject.getSeconds()}`;
        }

        var date = `${dateObject.getFullYear()}-${month}-${dateObject.getDate()}`;
        var time = `${hour}:${minutes}:${seconds}`;
        var dateTime = date + " " + time;

        return dateTime;
      } else {
        return "2000-01-01 13:13:13";
      }
    },
    checkUpvote() {
      let check = this.user.upvotedQuestion.includes(
        this.$route.params.questionId
      );
      return check;
    },
    checkDownvote() {
      let check = this.user.downvotedQuestion.includes(
        this.$route.params.questionId
      );
      return check;
    },
    loggedEmail() {
      return localStorage.getItem("email");
    },
    token() {
      return localStorage.getItem("token");
    }
  },
  created() {
    this.$store.dispatch("fetchOneQuestion", this.$route.params.questionId);
    if (localStorage.getItem("token")) {
      this.$store.dispatch("fetchLoggedUser");
    }
  }
};
</script>

<style scoped>
.ansCard:nth-child(odd) {
  background-color: rgb(255, 245, 226);
}

i {
  font-size: 40px;
}

i.fa-angle-up,
i.fa-angle-down {
  position: relative;
  top: 0;
  transition: 70ms;
}

.glowUp {
  color: blue;
  text-shadow: 0 0 7px rgb(0, 96, 185);
}

.glowDown {
  color: blue;
  text-shadow: 0 0 7px rgb(0, 96, 185);
}

i.fa-angle-up:hover {
  top: -3px;
}

i.fa-angle-up:active {
  top: 0;
}

i.fa-angle-down:hover {
  top: 3px;
}

i.fa-angle-down:active {
  top: 0;
}

.main {
  border-bottom: 2px solid rgb(179, 179, 179);
  /* background-color: rgb(255, 245, 226); */
  /* border-radius: 5px; */
}

p {
  text-align: justify;
  font-family: cursive;
}

.question-info h1 {
  font-family: "Oswald";
}

.answer-area {
  padding-left: 70px;
}

h4.reply-title {
  font-family: "Oswald";
}

a.vote {
  color: black;
}

h5.counter-votes {
  font-family: "Oswald";
}
</style>