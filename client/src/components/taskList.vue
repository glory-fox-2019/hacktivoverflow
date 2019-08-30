<template>
<div>
  <h2 class="pl-4">All Question</h2>
  <p class="pl-4">{{questions.length}} question</p>
  <hr>
  <div v-for="ask in questions" :key="ask.id">
    <Task :asks="ask"/>
  </div>
</div>
</template>

<script>
import Task from '@/components/Task.vue';
import {mapState} from 'vuex';
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['questions']),
  },
  components: {
    Task,
  },
}
</script>

<style>

</style>