<template>
  <div class="container">
    <div class="pt-4">
      <div>
        <h1>{{ question.title }}</h1>
      </div>
      <div class="d-flex flex-row justify-content-center">
        <div class="mr-5">
          <p>Asked By {{question.User.username}}</p>
        </div>
        <div class="mr-5">
          <p>{{question.votes + TempNum}} Votes</p>
        </div>
        <div class="mr-5">
          <p>fdfsffs00</p>
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div class="pt-2 d-flex flex-row justify-content-between">
        <div class="d-flex flex-column mb-3">
          <a @click="vote(1)" v-if=" this.IdUser != question.User._id">
            <img src="https://image.flaticon.com/icons/svg/25/25223.svg" width="40px;" alt />
          </a>
          <h4 v-if=" this.IdUser != question.User._id">{{question.votes + TempNum }}</h4>
          <a @click="vote(-1)" v-if=" this.IdUser != question.User._id">
            <img src="https://image.flaticon.com/icons/svg/25/25623.svg" width="40px;" alt />
          </a>
        </div>
        <p style="text-aling : left;">{{question.description}}</p>
        <div></div>
      </div>
      <div class="d-flex flex-row justify-content-start">
        <h5>{{question.Answer.length}} Answer</h5>
      </div>
      <div></div>
      <div class="container">
        <div v-for="q in answer" :key="q._id">
          <hr />
          <div style="text-align : center;">
            <h3>{{q.title}}</h3>
          </div>
          <div style="text-align : left">
            <div class="d-flex flex-column mb-3">
              <a @click="answerVote(1 , q._id)" >
                <img src="https://image.flaticon.com/icons/svg/25/25223.svg" width="40px;" alt />
              </a>
              <h4 style="padding-left : 13px;">{{q.votes + TempNumAnswer }}</h4>
              <a @click="answerVote(-1, q._id)" >
                <img src="https://image.flaticon.com/icons/svg/25/25623.svg" width="40px;" alt />
              </a>
            </div>
          </div>
          <div class="container anwswer">
            <h5>{{q.description}}</h5>
          </div>
          <div class="d-flex flex-column">
            <div>
              <a href="#" class="mr-2">Edit</a>
              <a href="#">Share</a>
            </div>
            <div>Answered By {{q.User.username}}</div>
            <button v-if="IdUser == q.User._id" class="btn btn-primary" @click="pindahEdit(q._id , q.description , q.title)" style="width : 50px;">Edit</button>
          </div>
        </div>
        <div class="pt-3">
          <hr />
        </div>
        <h5>Add Your Answer Here</h5>
        <form
          class="form-answer d-flex flex-column justify-content-center mb-5"
          @submit.prevent="addAnswer"
        >
          <div>
            <input type="text" class="mt-2 typeText" placeholder="title" v-model="title" />
          </div>
          <div class="mt-2">
            <textarea class="mt-2 typeArea" placeholder="description answer" v-model="description"></textarea>
          </div>
          <div class="mt-2">
            <input type="submit" class="btn btn-primary" value="Add" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { log } from "util";
export default {
  created() {
    axios({
      method: "GET",
      url: `http://34.87.7.44/question/${this.$route.params.id}`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.question = data;
        console.log(data);
        return axios({
          method: "GET",
          url: `http://34.87.7.44/answer/${this.$route.params.id}`,
          headers: {
            token: localStorage.getItem("token")
          }
        });
      })
      .then(({ data }) => {
        this.answer = data;
      })
      .catch(console.log);
  },
  data() {
    return {
      question: {},
      answer: [],
      title: "",
      description: "",
      IdUser: localStorage.getItem("id"),
      TempNum: 0,
      TempNumAnswer: 0
    };
  },
  methods: {
    addAnswer() {
      let { question, title, description } = this;
      this.$store
        .dispatch("addAnswer", {
          question,
          title,
          description
        })
        .then(data2 => {
          return axios({
            method: "GET",
            url: `http://34.87.7.44/answer/${this.$route.params.id}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
        })
        .then(({ data }) => {
          this.answer = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    vote(num) {
      this.$store
        .dispatch("vote", {
          id: this.question._id,
          num
        })
        .then(data => {
          this.TempNum++;
        })
        .catch(console.log);
      // console.log('upvote')
    },
    answerVote(num , id){
        this.$store.dispatch("answerVote" , {
            id,
            num
        })
        .then(data => {
          this.TempNumAnswer++;
        })
        .catch(console.log);
    },
    pindahEdit(id , description , title) {
      this.$router.push(`/editanswer/${id}?title=${title}&description=${description}`);
    }
  }
};
</script>

<style>
.anwswer {
  text-align: left;
  padding-top: 20px;
  width: 85%;
  height: 200px;
  background-color: #fff8dc;
}
.typeText {
  text-align: center;
  width: 60%;
  border: none;
}

.typeArea {
  text-align: center;
  width: 60%;
  border: none;
  height: 150px;
}
</style>