<template>
  <div class="home">
    <Navbar/>
    <div class="main">
      <div class="sidebar col-md-2">
        <SideBar />
      </div>
      <div class="mt-5 router ml-auto col-md-7">
        <router-view/>
      </div>
      <div class="col-md-3 mt-5">
        <!-- <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione corporis laboriosam quos ex dolorum consequatur, aut asperiores tempore perferendis quasi commodi corrupti sapiente magni maiores veniam ea voluptatem labore suscipit?</p> -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex';
import Navbar from "@/components/Navbar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "home",
  components: {
    Navbar,
    SideBar, 
  },
  computed: {
    ...mapState(['questions']),
  },
  created() {
    this.$store.dispatch("getQuestion");
  }
};
</script>
<style scoped>
.main {
  display: flex;
  margin-top: 4rem;
}
.sidebar {
  border-right: 1px solid silver;
  height: 100vh;
  position: fixed;
}
.router {
  padding: 0;
}
</style>
