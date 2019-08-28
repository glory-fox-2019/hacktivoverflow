<template>
  <b-container>
    <b-row align="left">
      <b-col cols="12" class="m-3 border-bottom">
        <h1>{{question.title}}</h1>
        <div>
          <span class="mr-5">Asked by : {{question.owner.username}}</span>
          <span class="mr-5">Replies : {{question.answer.length}}</span>
        </div>
      </b-col>
      <b-col cols="12" class="m-3 border-bottom" style="min-height: 200px;">
        <b-row align="left">
          <b-col cols="2">
            <div class="vote" align="center">
              <i class="fas fa-thumbs-up icon-vote"></i>
              <h3 class="mt-4 mb-4">{{question.upvotes.length - question.downvotes.length}}</h3>
              <i class="far fa-thumbs-down icon-vote"></i>
            </div>
          </b-col>
          <b-col cols="10">
            <p>
             {{question.description}}
            </p>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" class="m-3 border-bottom">
        <h5>{{question.answer.length}} Answer</h5>
      </b-col>
      <b-col cols="12">
        <answer v-for="answer in question.answer" :key="answer._id" :data="answer"></answer>
      </b-col>
      <b-col cols="12">
        <h5 class="m-3 border-bottom">Your Answer</h5>
        <b-form class="m-3">
          <b-form-group label="Input your answer">
            <b-form-textarea id="textarea-rows" placeholder="Your answer" rows="8"></b-form-textarea>
          </b-form-group>
          <b-button variant="primary" align="right"> Submit </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import answer from "../components/Answer.vue";
import axios from '../api/config'
export default {
  data(){
      return{
         question: {
             owner: {},
             answer: {},
             upvotes: [],
             downvotes: [],
         }
      }
  },
  components: {
    answer
  },
  created(){
      this.fetchData()
  },
  methods : {
      fetchData(){
          const { id } = this.$route.params
          axios({
              method: 'get',
              url: `/question/find/${id}`
          })
          .then(({ data }) => {
              this.question = data;
          })
          .catch(console.log)
      }
  }
};
</script>

<style>
.vote {
  display: flex;
  flex-direction: column;
  font-size: 30px;
  align-content: left;
  justify-content: left;
}
</style>