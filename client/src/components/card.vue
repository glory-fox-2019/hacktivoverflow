<template>
  <div class="card flex-row mt-3" style="width:100%;height:200px;">
 
          <!-- <router-link :to="'/question/'+question._id" > -->
          <div @click="gotoQuestionDetail" class="card-body">
          <h5 class="card-title">{{question.title}}</h5>
          <p class="card-text text-justify">{{question.description}}</p>
          <p>by {{question.UserId.username}}</p>
          <p>{{getDate}}</p>
          <!-- <p>on  -->
          </div>
          <!-- </router-link> -->
  
  </div>
</template>

<script>
export default {
    name : 'card',
    props : {
        question : Object
    },
    methods : {
        gotoQuestionDetail(){
            this.$router.push(`/question/${this.question._id}`)
            
        }

    },
    computed : {
        getDate(){
            return new Date(this.question.createdAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        }
    }


}
</script>

<style>

</style>
