<template>
  <div class="mainpage container pt-5 pb-5">
    <div class="quote mb-5 d-flex flex-column align-items-start">
      <h4>Welcome to Hacktivoverflow, biggest sharing community about codes</h4>
      <h4>Please, enjoy your visit.</h4>
    </div>
    <div class="main-btn sticky-top mb-5 d-flex p-2 justify-content-around">
      <form style="width:50%" class="d-flex justify-content-center align-items-center">
        <input type="text" placeholder="Seach..." autocomplete="off" class="form-control mr-2" />
        <i style="font-size:30px" class="fas fa-search"></i>
      </form>
      <div>
        <button type="button" class="btn" data-toggle="modal" data-target="#Create">Post Question</button>
      </div>
    </div>
    <div>
      <QuestionCard
        v-for="question in this.$store.state.questions"
        :key="question._id"
        :quest="question"
      ></QuestionCard>
    </div>

    <div class="modal fade-scale" id="Create">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered mt-0 mb-0">
        <div class="modal-content" style="height:500px">
          <!-- Modal Header -->
          <div class="modal-header d-flex justify-content-center">
            <h1 class="modal-title">New Post</h1>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="d-flex justify-content-center align-items-start">
              <div class="container">
                <form>
                  <label>Title</label>
                  <input
                    type="text"
                    v-model="title"
                    class="form-control"
                    autocomplete="off"
                    placeholder="Question's title"
                  />
                  <label>Description</label>
                  <textarea
                    rows="10"
                    type="text"
                    v-model="description"
                    class="form-control"
                    autocomplete="off"
                    placeholder="Question's description"
                  />
                </form>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer d-flex justify-content-around align-items-center">
            <button type="button" class="btn" data-dismiss="modal" @click="postCreated">Post</button>
            <button type="button" class="btn" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "../components/QuestionCard";
export default {
  data() {
    return {
      title: "",
      description: ""
    };
  },
  components: {
    QuestionCard
  },
  methods: {
    postCreated() {
      const data = {
        title: this.title,
        description: this.description
      };
      this.$store.dispatch("createPost", data);
      this.title = "";
      this.description = "";
    }
  },
  mounted() {
    this.$store.dispatch("readAll");
  }
};
</script>

<style scoped>
/* .fade-scale {
  transform: scale(0);
  opacity: 0;
  -webkit-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;
  transition: all 0.25s linear;
}
.fade-scale.in {
  opacity: 1;
  transform: scale(1);
} */
.quote h4 {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
}
.mainpage {
  background-color: whitesmoke;
  min-height: 100vh;
}
.main-btn {
  background-color: whitesmoke;
  top: 73px;
}
button {
  width: 100%;
  border: 2px solid black;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  transition: 0.5s all;
}
button:hover {
  color: whitesmoke;
  border: 2px solid #0b2d54;
  background-color: #0b2d54;
  transition: 0.5s all;
}
</style>