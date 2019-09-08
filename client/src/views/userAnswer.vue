<template>
  <div v-if="$store.state.isLogin" class="container mt-4">
    <div class="row">
      <div class="col-8">
        <div class="content-section">
            <h2>{{$store.state.currentUser}} answer</h2>
             <answer :theanswer="answer" :isUser="true" v-for="answer in userAnswers" :key="answer._id"></answer>
        </div>
      </div>
      <sidebar></sidebar>
    </div>
  </div>
</template>

<script>
import sidebar from '../components/sidebar'
import answer from '../components/answer'
export default {
  name: 'userAnswer',
  components: {
    sidebar,
    answer
  },
  method: {

  },
  computed: {

    userAnswers () {
      return this.$store.state.userAnswers
    }

  },
  mounted () {
    this.$store.dispatch('getUserAnswers')
  }

}
</script>

<style>
</style>
