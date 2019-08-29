<template>
  <form
    class="form-answer d-flex flex-column justify-content-center mb-5 pt-5"
    @submit.prevent="editAnswers"
  >
    <div>
      <input type="text" class="mt-2 typeText" placeholder="title" v-model="title" />
    </div>
    <div class="mt-2">
      <textarea class="mt-2 typeArea" placeholder="description answer" v-model="description"></textarea>
    </div>
    <div class="mt-2">
      <input type="submit" class="btn btn-primary" value="Edit" />
    </div>
  </form>
</template>

<script>
export default {
    created (){
        console.log(this.$route.params.id ,  ' id title nya params')
        console.log(this.$route.query.title , ' ini title nya query')
        console.log(this.$route.query.description , ' ini des nya query' )
    },
    data (){
        return {
            title : this.$route.query.title,
            description : this.$route.query.description
        }
    },
    methods : {
        editAnswers (){
        let { title , description } = this
        this.$store.dispatch('editAnswer' ,{
            title , description , id : this.$route.params.id 
        })
        .then(data=>{

        })
        .catch(err=>{
            console.log(err)
        })
    }
    }
};
</script>

<style>
.typeText {
  text-align: center;
  width: 60%;
  border: none;
}

.typeArea {
  text-align: center;
  width: 60%;
  border: none;
  height: 150px;
}
</style>