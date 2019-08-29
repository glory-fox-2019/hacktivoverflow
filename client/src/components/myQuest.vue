<template>
  <div class="task">
    <div class="ml-2 d-flex align-items-center">
      <!-- <button>test</button>
      <button>test</button>
      <button>test</button> -->
    </div>
    <div class="task-content p-4">
      <router-link :to="`/detail/${quest._id}`">{{quest.title}}</router-link>
      <div class="task-tag mt-4">
        <!-- <small class="mr-4">Asked by: {{this.user.name}}</small> -->
        <!-- <small class="mr-4">Views: {{asks.upVote.length + asks.downVote.length}}</small> -->
        <small>{{Moment(quest.createdAt).fromNow()}}</small>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Moment from 'moment';
export default {
  props:['quest'],
  data() {
    return {
      Moment,
    };
  },
  computed: {
    // ...mapState(['question']),
  },
  methods: {
  },
};
</script>

<style scoped>
.task {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #edecf0;
};
.task-content {
  text-align: left !important;
};
p {
  font-size: 10px !important;
}
</style>