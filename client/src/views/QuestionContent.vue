<template>
  <div class="mainpage container pt-5">
    <div>
      <div class="quest-card d-flex justify-content-start mb-3">
        <div class="quest-info d-flex flex-column justify-content-center align-items-around p-3">
          <div
            class="quest-like d-flex flex-column justify-content-center align-items-center p-2 mb-2"
          >
            <button class="btn" @click.prevent="vote('0')">
              <i class="fas fa-heart"></i>
            </button>
            <p
              class="m-0"
            >{{this.$store.state.question.upvotes.length - this.$store.state.question.downvotes.length}}</p>
            <h6>Votes</h6>
            <button class="btn" @click.prevent="vote('1')">
              <i class="fas fa-heart-broken"></i>
            </button>
          </div>
          <div class="quest-answer p-2">
            <p class="m-0">{{this.$store.state.question.answers.length}}</p>
            <h6>Answers</h6>
          </div>
        </div>
        <div
          class="quest-content p-3 d-flex flex-column justify-content-between"
          style="width:100%"
        >
          <div class="quest-quest d-flex flex-column align">
            <h4 class="m-0">{{this.$store.state.question.title}}</h4>
            <hr class="m-0 mt-2 mb-2" />
            <p>{{this.$store.state.question.description}}</p>
          </div>
          <div class="quest-maker d-flex justify-content-end align-items-center">
            <p class="m-0">Post By: {{this.$store.state.question.UserId.username}}</p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center mb-3">
        <button type="button" class="btn" data-toggle="modal" data-target="#Create">Give Answer</button>
      </div>
      <hr style="border: 2px solid black" />
    </div>
    <div class="answer-list">
      <AnswerCard
        v-for="answer in this.$store.state.question.answers"
        :key="answer._id"
        :info="answer"
      ></AnswerCard>
    </div>
    <div class="modal fade-scale" id="Create">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered mt-0 mb-0">
        <div class="modal-content" style="height:500px">
          <!-- Modal Header -->
          <div class="modal-header d-flex justify-content-center">
            <h2 class="modal-title">give Answer</h2>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="d-flex justify-content-center align-items-start">
              <div class="container">
                <form>
                  <label>Answer</label>
                  <textarea
                    rows="10"
                    type="text"
                    v-model="answer"
                    class="form-control"
                    autocomplete="off"
                    placeholder="input your answer"
                  />
                </form>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer d-flex justify-content-around align-items-center">
            <button type="button" class="btn" data-dismiss="modal" @click="postCreated">Post</button>
            <button type="button" class="btn" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerCard from "../components/AnswerCard";
export default {
  components: {
    AnswerCard
  },
  data() {
    return {
      quest: this.$store.state.question,
      answer: '',
    };
  },
  methods: {
    vote(value) {
      const id = this.$route.params.id;
      console.log(value);
      const data = {
        id,
        value
      };
      this.$store.dispatch("vote", data);
    },
    postCreated(){
        const data = {
            answer: this.answer,
            id: this.$route.params.id,
        }
        this.$store.dispatch('addAnswer', data);
        this.answer = '';
    },
  },
  created() {
    const id = this.$route.params.id;
    this.$store.dispatch("readOne", id);
  }
};
</script>

<style scoped>
.quest-card {
  border: 1px solid black;
  border-radius: 5px;
}
.quest-like {
  border: 1px solid black;
  border-radius: 5px;
}
.quest-answer {
  border: 1px solid black;
  border-radius: 5px;
}
.quest-quest hr {
  width: 100%;
  border: 1px solid black;
}
h6,
h4,
p {
  font-family: "Roboto", sans-serif;
}
.mainpage {
  background-color: whitesmoke;
  min-height: 100vh;
}
button {
  width: 80%;
  border: 2px solid black;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  transition: 0.5s all;
}
button:hover {
  color: whitesmoke;
  border: 2px solid #0b2d54;
  background-color: #0b2d54;
  transition: 0.5s all;
}
</style>