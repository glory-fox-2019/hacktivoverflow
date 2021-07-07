<template>
  <div class="sidebar">
    <!-- menu-section -->
    <div class="menu-section d-flex flex-column align-items-start pl-4 pt-3">
      <h4 class="mb-3">Menu</h4>
      <a href class="d-flex align-items-center mb-0" @click.prevent="toHome()">
        <i class="fas fa-home mr-3"></i>
        <span>Home</span>
      </a>
    </div>
    <!-- menu-section -->
    <div class="dashboard-section d-flex flex-column align-items-start pl-4 pt-3">
      <h4 class="mb-3">Dasboard</h4>
      <a href class="d-flex align-items-center" @click.prevent>
        <i class="fas fa-user"></i>
        <span>Profile</span>
      </a>
      <a href class="d-flex align-items-center" @click.prevent>
        <i class="far fa-question-circle mr-3"></i>
        <span>Your Questions</span>
      </a>
      <a href class="d-flex align-items-center" @click.prevent>
        <i class="far fa-comment mr-3"></i>
        <span>Your Answers</span>
      </a>
      <a href class="d-flex align-items-center" @click.prevent>
        <i class="fas fa-cog mr-3"></i>
        <span>Your Setting</span>
      </a>
      <a href class="d-flex align-items-center" @click.prevent="signout()" v-if="isLogin">
        <i class="fas fa-sign-out-alt mr-3"></i>
        <span>Signout</span>
      </a>
    </div>
    <!-- watched tags -->
    <div class="watched-tags d-flex flex-column align-items-start">
      <div class="title-watch d-flex align-items-center mb-3 p-2 justify-content-between">
        <div class="text-logo d-flex align-items-center">
          <i class="fas fa-tag mr-2"></i>
          <h5 class="m-0">Watched Tags</h5>
        </div>
        <a href class="m-0" @click.prevent v-b-modal.edit-watched-tags>edit</a>
      </div>
      <div class="tags-list p-2 d-flex flex-wrap">
        <TagCard v-for="tag in user.watchedTags" :key="tag._id" :tag="tag" />
      </div>
      <FormWatchedTags />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TagCard from "@/components/TagCard.vue";
import FormWatchedTags from "@/components/FormEditWatchedTags.vue";
import Swal from "sweetalert2";

export default {
  components: {
    TagCard,
    FormWatchedTags
  },
  methods: {
    signout() {
      Swal.fire({
        title: "Sign out?",
        text: "You will be logged out after this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then(result => {
        if (result.value) {
          Swal.fire("See ya!");
          this.$store.commit("SIGNOUT");
        }
      });
    },
    toHome() {
      this.$router.push("/");
      this.$store.commit("TO_ALL_QUESTIONS");
    }
  },
  computed: {
    ...mapState(["user", "isLogin"])
  },
  created() {
    this.$store.dispatch("fetchLoggedUser");
  }
};
</script>

<style scoped>
*:not(i) {
  font-family: "Oswald";
}

a {
  text-decoration: none !important;
  margin-bottom: 25px;
}

.sidebar {
  /* border: 1px solid black; */
  border-radius: 0 7px 7px 0;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.274);
  position: fixed;
}

h4 {
  font-family: "Oswald";
  color: grey;
}

i {
  color: grey;
}

i.fa-user {
  margin-right: 18px;
}

.watched-tags {
  border: 1px solid rgb(209, 209, 209);
  margin-bottom: 20px;
  border-radius: 7px;
}

.title-watch {
  color: grey;
  width: 100%;
  border-bottom: 1px solid rgb(209, 209, 209);
}
</style>