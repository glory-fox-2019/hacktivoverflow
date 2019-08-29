<template>
  <div class="home">
    <div class="container d-flex flex-row justify-content-center pt-5">
      <ListQuestion v-bind:cols="6"/>
      <advertisement v-bind:cols="12"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListQuestion from "../components/ListQuestion";
import advertisement from '../components/advertisement'
export default {
  name: "home",
  components: {
    ListQuestion,
    advertisement
  },
  created (){
    if(!localStorage.getItem('token')){
      this.$router.push('/login')
    }
    this.$store.dispatch('RenderQuestion')
    console.log(this.questionlist , ' di home ini ya')
  },
  watch : {
    '$store.state.listQuestion' : function (){
      // this.questionlist = this.$store.state.listQuestion
    }
  }
};
</script>
