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
    Question,
  },
  created() {
    const token = localStorage.getItem('token');
    axios({
      url: '/question/find/collection',
      method: 'get',
      headers: { token },
    })
      .then(({ data }) => {
        this.questions = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    detail(id) {
      console.log(id);
    },
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
