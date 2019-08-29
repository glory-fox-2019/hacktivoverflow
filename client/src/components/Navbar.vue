<template>
  <b-navbar class="p-0 d-flex fixed-top">
    <b-navbar-nav class="col-3">
      <a href="#" class="brand d-flex align-items-center">
        <img src="../assets/logo.jpeg" alt="brand" />
        <span class="brand">Questo</span>
      </a>
    </b-navbar-nav>
    <!-- search section -->
    <div class="search col-5 d-flex align-items-end align-self-stretch justify-content-center pb-3">
      <i class="fas fa-search mr-3"></i>
      <input type="text" placeholder="Search by Title ..." v-model="search" />
    </div>
    <div class="col-4 d-flex align-items-center justify-content-end">
      <button
        class="btn btn-primary d-flex align-items-center mr-2"
        v-b-modal.signup
        v-if="!isLogin"
      >
        <i class="fas fa-user-plus mr-2"></i>
        <span>SignUp</span>
      </button>
      <button
        class="btn btn-primary d-flex align-items-center mr-2"
        v-b-modal.signin
        @click="toSignin()"
        v-if="!isLogin"
      >
        <i class="fas fa-sign-in-alt mr-2"></i>
        <span>SignIn</span>
      </button>
      <button
        class="btn btn-primary d-flex align-items-center"
        v-b-modal.add-question
        @click="toAsk()"
        v-if="isLogin"
      >
        <i class="fas fa-plus-circle mr-2"></i>
        <span>Ask a question</span>
      </button>
      <i class="fas fa-ribbon ml-3"></i>
      <i class="fas fa-comment ml-3"></i>
      <div class="user-image ml-3" :style="{ backgroundImage: 'url(' + profPic + ')' }"></div>
    </div>
    <AddQuestion />
    <FormSignUp />
    <FormSignIn />
  </b-navbar>
</template>

<script>
import AddQuestion from "@/components/AddQuestion.vue";
import FormSignUp from "@/components/FormSignUp.vue";
import FormSignIn from "@/components/FormSignIn.vue";
import { mapState } from "vuex";
import axios from "@/apis/server.js";

export default {
  data() {
    return {
      profPic: "http://petmedmd.com/images/user-profile.png",
      search: ""
    };
  },
  components: {
    AddQuestion,
    FormSignUp,
    FormSignIn
  },
  methods: {
    toSignin() {
      this.$bvModal.show("signin");
    },
    toAsk() {
      this.$bvModal.show("add-question");
    },
    filterQuestion(keyword) {
      axios({
        method: "get",
        url: `/questions`
      })
        .then(({ data }) => {
          let filter = data.filter(question =>
            question.title.toLowerCase().includes(keyword)
          );
          console.log(filter, "dapet nih <<<<");
          this.$store.commit("SEARCH_QUESTIONS", filter);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  watch: {
    search(newVal, oldVal) {
      this.filterQuestion(newVal);
    }
  }
};
</script>

<style scoped>
span.brand {
  font-family: "Amatic SC";
  font-size: 28px;
  font-weight: bold;
  color: #434343;
  text-decoration: none;
}

nav {
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.459);
}

img {
  width: 100px;
}

i.fa-search {
  font-size: 25px;
  color: grey;
}

input {
  width: 30%;
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid rgb(144, 144, 144);
  font-family: "Oswald";
  color: #434343;
  transition: 0.4s;
}

input:focus {
  width: 70%;
}

a,
span {
  padding: 0;
  text-decoration: none;
}

.btn {
  background-color: #f3951a;
  border: #f3951a;
  font-family: "Oswald";
}

i.fa-comment,
i.fa-ribbon {
  font-size: 25px;
  color: grey;
}

.user-image {
  background-size: cover;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  border: 2px solid grey;
}
</style>