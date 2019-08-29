<template>
  <div>
    <div v-if="!isLogin" class="home">
      <b-row>
        <b-col cols="4" class="d-flex align-items-center" style="height: 100vh;">
          <div>
            <div class="pl-5">
            <h1 style="font-size: 3rem;"><b>Ask Anything</b></h1>
            <h5 class="text-justify">Empower developers and connect them to solutions that boost productivity.</h5>
            <router-link to="/login">
            <b-button variant="primary" class="rounded-pill mt-3 px-5 shadow">Getting Started</b-button>
            </router-link>
            </div>
          </div>
        </b-col>
        <b-col cols="8" class="d-flex align-items-center" style="height: 100vh;">
          <div class="d-flex justify-content-center">
          <img src="https://storage.googleapis.com/hacktiv8-assets-adityabp/landing3.png" alt="landing" class="pt-5" width="80%">
          </div>
        </b-col>
      </b-row>
    </div>
    <b-row v-else>
      <b-col cols="2">
        <Sidebar v-if="$store.state.user.isLogin"></Sidebar>
      </b-col>
      <b-col cols="8" style="margin-top: 100px;">
        <QuestionList/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'home',
  components: {
    QuestionList,
    Sidebar,
  },
  computed: {
    isLogin(){
      return this.$store.state.user.isLogin
    }
  },
  created(){
    console.log('FETCH!')
    this.$store.dispatch('fetchQuestions')
    this.$store.dispatch('fetchWatchedTags')
  },
  mounted(){
    
  }
};
</script>

<style>
</style>
