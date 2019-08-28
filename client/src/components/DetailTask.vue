<template>
  <div class="task">
    <!-- {{ask}} -->
    <div class="task-side p-4">
      <button>test</button>
      <button>test</button>
    </div>
    a;kjsdbfoaidhfouahfdouyh
    <div class="task-content p-4">
      <h5 dtyle="text-align: left">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
      <p>{{question}}</p>
      <div class="task-tag">
        <button>test</button>
        <button>test</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['question'])
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