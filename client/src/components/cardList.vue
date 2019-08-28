<template>
  <div>
      <card :question="question" v-for="question in getAllQuestions" :key="question.id"></card>

  </div>
</template>

<script>
import card from './card'
export default {
    name : "cardList",
    components : {
        card
    },
    computed : {

        getAllQuestions(){
            return this.$store.state.allQuestions
        }

    },
    mounted(){
        
        this.$store.dispatch("getAllQuestions")
    }

}
</script>

<style>

</style>
