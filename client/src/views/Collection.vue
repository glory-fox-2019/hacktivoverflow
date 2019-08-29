<template>
  <div>
    <question
      id="question"
      v-for="question in questions"
      :key="question._id"
      :question="question"
      class="transition"
    ></question>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import axios from '../api/config.js';
import Question from '../components/Question.vue';

export default {
  name: 'home',
  computed: {
    ...mapState(['questions']),
  },
  data() {
    return {};
  },
  components: {
    Question,
  },
  created() {
    const token = localStorage.getItem('token');
    this.$store.dispatch('getMyCollection', token);
  },
  methods: {},
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
