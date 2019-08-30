<template>
  <div class="add-question">
    <b-modal id="add-question" title="BootstrapVue">
      <div class="header" slot="modal-header">
        <h4>Ask a Question</h4>
      </div>
      <div class="body">
        <form>
          <!-- ============= title -->
          <label for>Title:</label>
          <b-form-input placeholder="title ..." v-model="formAddQuestion.title" autocomplete="off"></b-form-input>
          <!-- ============= content -->
          <label for>Question:</label>
          <b-form-textarea
            id="textarea"
            placeholder="ask something..."
            rows="3"
            max-rows="6"
            v-model="formAddQuestion.content"
          ></b-form-textarea>
          <!-- ============= tags -->
          <label for>Tags:</label>
          <small class="text-muted ml-2">
            <i>(Maximum tags is 4)</i>
          </small>
          <tags-input
            element-id="tags"
            v-model="selectedTags"
            :existing-tags="existingTags"
            :typeahead="true"
          ></tags-input>
        </form>
      </div>
      <div class="foter" slot="modal-footer">
        <button class="btn btn-primary mr-2" @click="addQuestion()">Ask</button>
        <button class="btn btn-danger" @click="cancel()">Cancel</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "@/apis/server.js";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      selectedTags: [],
      existingTags: [],
      formAddQuestion: {
        title: "",
        content: "",
        tags: []
      }
    };
  },
  methods: {
    cancel() {
      this.$bvModal.hide("add-question");
    },
    fetchAllTags() {
      axios({
        method: "get",
        url: `/tags`
      })
        .then(({ data }) => {
          let formatted = [];
          for (let i = 0; i < data.length; i++) {
            formatted.push({
              value: data[i].name
            });
          }
          this.existingTags = formatted;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addQuestion() {
      this.$store
        .dispatch("addQuestion", this.formAddQuestion)
        .then(data => {
          this.formAddQuestion.title = "";
          this.formAddQuestion.content = "";
          this.formAddQuestion.tags = [];
          this.selectedTags = [];

          this.$store.dispatch("fetchAllQuestions");
          this.$bvModal.hide("add-question");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops!",
            text: "Please fill all fields"
          });
          console.log(err);
        });
    }
  },
  created() {
    this.fetchAllTags();
  },
  watch: {
    selectedTags(newVal, oldVal) {
      let nameOnly = [];
      for (let i = 0; i < newVal.length; i++) {
        nameOnly.push(newVal[i].value);
      }
      this.formAddQuestion.tags = nameOnly;
    }
  }
};
</script>

<style scoped>
.header h4,
button,
label {
  font-family: "Oswald";
}
label {
  margin-top: 7px;
}
</style>