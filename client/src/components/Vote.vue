<template>
  <div class="content__vote">
    <div class="vote--action">
      <button :class="{ 'active--up' : vote === 1}" @click="toggleVote('up')"><span class="mdi mdi-menu-up"></span></button>
    </div>
    <div class="vote--count">
      <span>10</span>
    </div>
    <div class="vote--action">
      <button :class="{ 'active--down' : vote === -1}" @click="toggleVote('down')"><span class="mdi mdi-menu-down"></span></button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      vote: 0,
    }
  },
  methods: {
    toggleVote(status){
      if(status === 'up'){
        if(this.vote === 0) this.vote = 1;
        else if (this.vote === -1) this.vote = 1;
        else this.vote = 0;
      }else{
        if(this.vote === 0) this.vote = -1;
        else if (this.vote === 1) this.vote = -1;
        else this.vote = 0;
      }
    }
  }
}
</script>

<style>

</style>