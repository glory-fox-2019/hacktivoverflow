<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <h1>All Questions</h1>
        </v-list-item-title>
        <v-list-item-subtitle>{{questions.length}} Questions</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-content>
          <AddQuestion/>
          <br>
          <h2 class="qlist">Questions List</h2>
          <QuestionList v-for="(question, index) in questions" :key="index" :q="question">
          </QuestionList>
       
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import QuestionList from "../components/QuestionList";
import AddQuestion from "../components/AddQuestion"
import { mapState } from "vuex";
export default {
  name: "AllQuestions",
  components: {
    QuestionList,
    AddQuestion
  },
  computed: mapState(["questions"])
};
</script>

<style>
.qlist{
  padding: 20px;
  margin-top: 30px
}
</style>