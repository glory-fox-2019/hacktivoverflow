<template>
<div>
  <div v-for="ans in answer" :key="ans.id">
    <Answer :answ="ans"/>
  </div>
</div>
</template>

<script>
import Answer from '@/components/Answer.vue';
import {mapState} from 'vuex';
export default {

  data() {
    return {
    }
  },
  computed: {
    ...mapState(['answer']),
  },
  components: {
    Answer,
  },
  created() {
    this.$store.dispatch('getAnswer', this.$route.params.id)
  }
}
</script>

<style>

</style>