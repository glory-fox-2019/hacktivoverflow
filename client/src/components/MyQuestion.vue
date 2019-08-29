<template>
<div>
  <h2 class="pl-4">My Question</h2>
  <p class="pl-4">{{myQuestion.length}} question</p>
  <hr>
  <div v-for="my in myQuestion" :key="my.id">
    <MyQuest :quest="my"/>
  </div>
</div>
</template>

<script>
import MyQuest from '@/components/myQuest.vue';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      userId: {id: localStorage.id}
    }
  },
  computed: {
    ...mapState(['myQuestion']),
  },
  components: {
    MyQuest,
  },
  created() {
    // console.log(this.userId.id);
    this.$store.dispatch('myQuestion', this.userId.id)
  }
}
</script>

<style>

</style>