<template>
  <div class="list">
    <QuestionCard
      v-for="question in questions"
      :key="question._id"
      :question="question"
      class="qcard"
    />
  </div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";
import { mapState } from "vuex";

export default {
  components: {
    QuestionCard
  },
  computed: {
    ...mapState(["questions"])
  },
  created() {
    this.$store
      .dispatch("fetchLoggedUser")
      .then(user => {
        let watchedTags = [];
        for (let i = 0; i < user.watchedTags.length; i++) {
          watchedTags.push(user.watchedTags[i]._id);
        }
        this.$store.dispatch("fetchWatchedQuestions", watchedTags);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.qcard:nth-child(odd) {
  background-color: rgb(255, 243, 228);
  border-radius: 5px;
}
</style>