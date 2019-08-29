<template>
  <b-container>
    <div class="item-list pt-5 pb-5">
      <question
        id="question"
        v-for="question in questions"
        :key="question._id"
        :question="question"
        class="transition"
      ></question>
    </div>
    <div class="overflow-auto">
    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import axios from '../api/config.js';
import Question from '../components/Question.vue';

export default {
  name: 'home',
  data() {
    return {
      questions: [],
    };
  },
  components: {
    HelloWorld,
    Question,
  },
  created() {
    axios({
      url: '/question/find',
      method: 'get',
    })
      .then(({ data }) => {
        this.questions = data;
      })
      .catch(console.log);
  },
  methods: {
  },
};
</script>

<style scoped>
.item-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.transition {
  transition: transform 0.8;
}

.transition:hover {
  transform: scale(1.01);
}
</style>
