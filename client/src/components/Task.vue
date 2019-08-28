<template>
  <div class="task">
    <div class="ml-2 d-flex align-items-center">
      <button>test</button>
      <button>test</button>
      <button>test</button>
    </div>
    <div class="task-content p-4">
      <h5 @click.prevent="toDetailTask(asks._id)">{{asks.title}}</h5>
      <!-- {{asks._id}} -->
      <div class="task-tag mt-4">
        <button>test</button>
        <button>test</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['asks'],
  data() {
    return {}
  },
  methods: {
    toDetailTask(questionId) {
      this.$store.dispatch('getOneQuestion', questionId);
    }
  },

}
</script>

<style scoped>
.task {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #edecf0;
};
.task-content {
  text-align: left !important;
  padding: 100px;
};
p {
  font-size: 10px !important;
}
</style>