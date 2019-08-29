<template>
  <div class="sidebar d-flex justify-content-center" style="cursor: pointer">
    <ul class="list-group list-group-flush">
      <li class="list-group-item side-bar" @click="clickHome">Home</li>
      <li class="list-group-item side-bar" @click="clickMyQuestion" v-if="isLogin">My Question</li>
      <li class="list-group-item side-bar" @click.prevent="clickWatch">Watch Tags</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import Toast from "../helpers/swal";

export default {
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    clickHome() {
      this.$router.push("/");
    },
    clickMyQuestion() {
      this.$router.push("/my-question");
    },
    clickWatch() {
      Toast.fire({
        type: "info",
        title: `Select the tag in the question tag`
      });
    }
  }
};
</script>

<style>
li {
  list-style-type: none;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.4);
  width: 180px;
  text-align: start;
}

.side-bar {
  font-size: 15px;
  cursor: pointer;
}

.side-bar:hover {
  font-weight: 600;
}
</style>