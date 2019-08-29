<template>
  <div class="question-card d-flex flex-column py-3 mb-3 px-2">
    <div class="question d-flex align-items-center mb-2">
      <div class="upvotes px-1 py-0 btn btn-primary disabled mr-4">+ {{question.upVotes.length}}</div>
      <div class="text">
        <h2 class="m-0">
          <a href @click.prevent="toDetail(question._id)">{{question.title}}</a>
        </h2>
      </div>
    </div>
    <div class="timestamp align-self-start mb-4 text-muted">
      created {{moment(`${formatDate}`).fromNow()}}, by
      <a href>{{question.userId.username}}</a>
    </div>
    <div class="tag-votes d-flex">
      <div class="tags-list col-8 d-flex p-0">
        <TagCard v-for="tag in question.tags" :key="tag._id" :tag="tag" />
      </div>
      <div class="votes-info col-4 d-flex justify-content-between">
        <div class="votes text-muted">{{totalVotes}} votes</div>
        <div class="answers text-muted">{{totalAnswers}} answers</div>
      </div>
    </div>
  </div>
</template>

<script>
import TagCard from "@/components/TagCard.vue";
import moment from "moment";

export default {
  props: ["question"],
  components: {
    TagCard
  },
  data() {
    return {
      moment: moment
    };
  },
  methods: {
    toDetail(id) {
      // this.$store
      //   .dispatch("fetchOneQuestion", id)
      //   .then(data => {
      //     console.log("Success fetching one question");
      this.$router.push(`/question/${id}`);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  computed: {
    totalVotes() {
      return this.question.upVotes.length - this.question.downVotes.length;
    },
    totalAnswers() {
      return this.question.answers.length;
    },
    formatDate() {
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
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Comfortaa&display=swap");

.question-card {
  width: 100%;
  /* border-bottom: 1px solid rgb(175, 175, 175); */
}

.text h2 {
  font-family: "Comfortaa";
  font-size: 20px;
}

.text a {
  text-decoration: none;
}

.timestamp {
  color: grey;
}

.votes-info {
  font-family: "Oswald";
}
</style>