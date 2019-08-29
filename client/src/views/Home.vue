<template>
  <div class="container my-container" style="margin-top:40px">
    <div class="col-3"></div>
    <div class="col-3 d-flex justify-content-start" style="padding-right:0px; position: fixed;">
      <Sidebar />
    </div>
    <div class="col-9" style="position: relative">
      <div class="col-7 d-flex justify-content-between align-items-end header" id="headerFixed">
        <div style="font-size: 20px">
          <p>All Question</p>
        </div>
        <div style="font-size: 18px">
          <p style="cursor:pointer" @click.prevent="addQuestion">
            <i class="fas fa-plus">Add Question</i>
          </p>
        </div>
      </div>
      <div class="col-9" style="height: 50px; width:100%; background-color:white"></div>
      <!-- <div style="height: 3.5rem;">&nbsp;</div> -->
      <div class="col" style="border: 3px solid rgba(0,0,0,0.6)">
          <ListQuestion
            v-for="(question, i) in questions"
            :key="i"
            :question="question"
            style="border-bottom: 1px solid rgba(0,0,0,0.2); margin-top: 20px"
          />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar.vue";
import ListQuestion from "../components/ListQuestion";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Sidebar,
    ListQuestion
  },
  data() {
    return {
      found: false
    };
  },
  methods: {
    clickMe() {
      Toast.fire({
        type: "success",
        title: "Signed in successfully"
      });
    },
    addQuestion() {
      if (localStorage.token) this.$router.push("/formquestion");
      else this.$router.push("/login");
    }
  },
  computed: {
    ...mapState(["isLogin", "userData", "questions"])
  },
  watch: {
    userState() {
      this.userData;
    }
  },
  mounted() {
    this.$store.dispatch("fetchQuestions");
  }
};
</script>

<style scoped>
.my-container {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
}

.col-9 {
  max-width: 100%;
}

.col-9[data-v-fae5bece] {
  max-width: auto;
}

#headerFixed {
  position: fixed;
  background-color: white;
  z-index: 100;
  padding-right: 55px;
}

#headerFixed::before {
  position: absolute;
  content: "";
  height: 300%;
  width: 100%;
  background: white;
  margin-left: -20px;
  z-index: -1;
}
</style>
