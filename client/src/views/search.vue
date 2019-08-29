<template>
  <div class="container d-flex flex-column justify-content-center pt-3">
    <!-- <h1>{{this.questionlist}}</h1> -->
    <div class="d-flex justify-content-between">
      <h3>All Question By Tag {{this.$store.state.TagsCurrent}}</h3>
    </div>
    <div
      class="card-list-2 d-flex flex-row mt-2 border border-light"
      v-for="list in this.$store.state.listQuestionTag"
      :key="list._id"
    >
      <div class="p-4 d-flex flex-column">
        <div>
          <h3>{{list.votes}}</h3>
          <h5>Votes</h5>
        </div>
        <div>
          <h3>{{list.Answer.length}}</h3>
          <h5>Answer</h5>
        </div>
      </div>
      <div class="pt-4">
        <div style="text-align : left;">
          <button
            class="buttonzss"
            href="#"
            @click="detail(list._id)"
            style="text-align : left; color : blue;"
          >{{list.title}}</button>
        </div>
        <div style="padding-top 20px;">
          <p style="text-align : left; ">{{list.description}}</p>
        </div>
        <div>
          <!-- {{list.tags}} -->
          <div style="text-align : left;">
            <a href="#" class="ml-1" v-for="tag in list.tags" :key="tag._id">{{ '#' + tag.name}}</a>
          </div>
          <div style="text-align : left;" class="pt-2">
            <p>created By {{list.User.username}}</p>
            <input
              v-if="IdUser == list.User._id"
              type="button"
              style="background-color : pink; border : none; color : white;"
              class="ml-1"
              value="edit"
              @click="moveEdit(list._id)"
            /> 
            <input
              v-if="IdUser == list.User._id"
              type="button"
              style="background-color : red; border : none; color : white;"
              class="ml-2"
              value="delete"
              @click="deleteZ(list._id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    pindah() {
      this.$router.push("/question");
    },
    detail(id) {
      // console.log(id)
      this.$router.push(`/detail/${id}`);
    },
    moveEdit (id){
      this.$router.push(`/editquestion/${id}`)
    },
    deleteZ(id) {
      this.$store.dispatch('deleteQuestion',{ id })
    }
  },
  computed: {
    questionlist() {
      return this.$store.state.listQuestion;
    }
  },
  data() {
    return {
      IdUser: localStorage.getItem("id")
    };
  }
};
</script>

<style>
.card-list-2 {
  width: 100%;
  height: 195px;
  /* border : solid slategray; */
  background-color: #ffffff;
}
.buttonzss {
  background: none !important;
  border: none;
  padding: 0 !important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  text-decoration: underline;
  cursor: pointer;
  list-style: none;
}
</style>