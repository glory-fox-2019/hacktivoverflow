<template>
     <div class="card flex-row mt-3" style="width:100%;height:200px;">
 
          <!-- <router-link :to="'/question/'+question._id" > -->
          <div  class="card-body">
          <h5 class="card-title">{{theanswer.title}}</h5>
          <p class="card-text text-justify">{{theanswer.description}}</p>
          <p>{{theanswer.UserId.username}}</p>
          <p>{{getDate(theanswer.createdAt)}}</p>
          <!-- <p>on  -->
          </div>
          <!-- </router-link> -->
  
  </div>
</template>

<script>
export default {
    name : 'answer',
    props : {
        theanswer : Object
    },
    methods : {
    getDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    }

    },
    data(){
        return{

        }
    }

}
</script>

<style>

</style>
