<template>
  <div>
      <card :isUser="isUser" :question="question" v-for="question in getAllQuestions" :key="question.id"></card>

  </div>
</template>

<script>
import card from './card'
export default {
    name : "cardList",
    props : {
        isUser : Boolean,
    },
    components : {
        card
    },
    computed : {

        getAllQuestions(){
            if (this.isUser){
                return this.$store.state.userQuestions
            }
            else{
                return this.$store.state.allQuestions
            }
        }

    },
    mounted(){
        
        this.$store.dispatch("getAllQuestions")
        this.$store.dispatch("getUserQuestions")
    }

}
</script>

<style>

</style>
