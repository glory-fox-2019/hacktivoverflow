<template>
  <div class="questions-list d-flex flex-column px-5 align-items-start">
    <h1 class="title mb-5">Questions</h1>
    <div class="tabs mb-3">
      <b-nav tabs>
        <b-nav-item :active="isSelectingAllQuestion" @click="toAll()">All Questions</b-nav-item>
        <b-nav-item
          :active="!isSelectingAllQuestion"
          @click="toWatched()"
          :disabled="!isLogin"
        >My Watched Questions</b-nav-item>
      </b-nav>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // isSelectingAllQuestion: true
    };
  },
  methods: {
    toAll() {
      // this.isSelectingAllQuestion = true;
      this.$store.commit("TO_ALL_QUESTIONS");
      this.$router.push("/");
    },
    toWatched() {
      // this.isSelectingAllQuestion = false;
      this.$store.commit("TO_WATCHED_QUESTIONS");
      this.$router.push("/watch-list");
    }
  },
  computed: {
    ...mapState(["isLogin", "isSelectingAllQuestion"])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.fullPath == "/watch-list") {
        vm.$store.commit("TO_WATCHED_QUESTIONS");
      }
    });
  }
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 1s;
}

.fade-enter {
  opacity: 0;
}

.list {
  width: 100%;
}

h1.title {
  font-family: "Oswald";
  font-weight: bold;
  font-size: 55px;
}
</style>