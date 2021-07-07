<template>
  <div class="answer-card d-flex align-items-center pb-3 mb-3">
    <!-- =================== Votes -->
    <div class="answer-votes-control d-flex flex-column align-items-center col-1">
      <a href class="vote-answer" @click.prevent="upvoteAnswer(answer._id)">
        <i class="fas fa-angle-up" :class="{glowUp: checkUpvoteAnswer}"></i>
      </a>
      <h5 class="m-0 counter-votes">{{answer.upVotes.length - answer.downVotes.length}}</h5>
      <a href class="vote-answer" @click.prevent="downvoteAnswer(answer._id)">
        <i class="fas fa-angle-down" :class="{glowUp: checkDownvoteAnswer}"></i>
      </a>
    </div>
    <!-- =================== User Image -->
    <div class="user-image col-2">
      <div class="image" :style="{ backgroundImage: 'url(' + profPic + ')' }"></div>
    </div>
    <!-- =================== Main Content -->
    <div class="main-content col-9 d-flex flex-column align-items-start pl-0">
      <small class="text-muted mt-3">
        reply from
        <a href>{{answer.userId.username}}</a>
        ,
        {{moment(`${formatDate}`).fromNow()}}
      </small>
      <p>{{answer.content}}</p>
      <!-- ============================= customize view =================================== -->
      <transition name="fade">
        <div class="options align-self-end" v-if="!isEdit && answer.userId.email == loggedEmail">
          <button class="btn btn-primary mr-2" @click="toEdit()">Edit</button>
          <button
            class="btn btn-danger"
            @click="deleteAnswer({answerId: answer._id, questionId: answer.questionId})"
          >Delete</button>
        </div>
      </transition>
      <!-- ==================== EDIT FORM ======================= -->
      <transition name="fade">
        <div class="edit-answer-form align-self-stretch" v-if="isEdit">
          <form class="d-flex flex-column">
            <label for class="align-self-start">Edit your answer:</label>
            <b-form-textarea
              id="textarea"
              placeholder="your answer..."
              rows="3"
              max-rows="6"
              v-model="formEditAnswer.content"
            ></b-form-textarea>
            <div class="options align-self-end mt-2">
              <button
                class="btn btn-primary editAns mr-2"
                @click.prevent="updateAnswer(answer._id)"
              >Update</button>
              <button class="btn btn-danger editAns" @click.prevent="cancel()">Cancel</button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  props: ["answer"],
  data() {
    return {
      profPic: "http://petmedmd.com/images/user-profile.png",
      formEditAnswer: {
        content: this.answer.content
      },
      moment: moment,
      isEdit: false
    };
  },
  methods: {
    deleteAnswer(ids) {
      Swal.fire({
        title: "Delete your answer?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch("deleteAnswer", ids)
            .then(_ => {
              console.log(_);
              this.$store.dispatch("fetchOneQuestion", this.answer.questionId);
              Swal.fire("Deleted!", "Your answer has been deleted.", "success");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    toEdit() {
      this.isEdit = true;
    },
    cancel() {
      this.isEdit = false;
    },
    updateAnswer(id) {
      // console.log(id);
      this.$store
        .dispatch("updateAnswer", {
          answerId: id,
          update: this.formEditAnswer
        })
        .then(data => {
          this.isEdit = false;
          this.$store.dispatch(
            "fetchOneQuestion",
            this.$route.params.questionId
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    upvoteAnswer(id) {
      console.log(id);
      this.$store
        .dispatch("upvoteAnswer", id)
        .then(_ => {
          this.$store.dispatch(
            "fetchOneQuestion",
            this.$route.params.questionId
          );
          this.$store.dispatch("fetchLoggedUser");
        })
        .catch(err => {
          console.log(err);
        });
    },
    downvoteAnswer(id) {
      this.$store
        .dispatch("downvoteAnswer", id)
        .then(_ => {
          this.$store.dispatch(
            "fetchOneQuestion",
            this.$route.params.questionId
          );
          this.$store.dispatch("fetchLoggedUser");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(["user"]),
    formatDate() {
      if (this.answer.createdAt) {
        let dateObject = new Date(this.answer.createdAt);
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
        return "2019-01-01 13:13:13";
      }
    },
    checkUpvoteAnswer() {
      let check = this.user.upvotedAnswer.includes(this.answer._id);
      return check;
    },
    checkDownvoteAnswer() {
      let check = this.user.downvotedAnswer.includes(this.answer._id);
      return check;
    },
    loggedEmail() {
      return localStorage.getItem("email");
    }
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 0;
}

.glowUp {
  color: blue;
  text-shadow: 0 0 7px rgb(0, 96, 185);
}

.glowDown {
  color: blue;
  text-shadow: 0 0 7px rgb(0, 96, 185);
}

.answer-card {
  /* border-bottom: 1px solid rgb(185, 185, 185); */
  border-radius: 5px;
  transition: all 400ms ease;
}

.image {
  width: 90px;
  height: 90px;
  background-size: cover;
  border-radius: 100%;
  border: 2px solid grey;
}

i {
  font-size: 30px;
  position: relative;
  top: 0;
  transition: 70ms;
}

i.fa-angle-up:hover {
  top: -3px;
}

i.fa-angle-up:active {
  top: 0px;
}

i.fa-angle-down:hover {
  top: 3px;
}

i.fa-angle-down:active {
  top: 0px;
}

p {
  text-align: left;
}

a.vote-answer {
  color: black;
}

h5.counter-votes {
  font-family: "Oswald";
}

button.editAns {
  font-size: 15px;
  font-family: "Oswald";
}

label {
  font-family: "Oswald";
}
</style>