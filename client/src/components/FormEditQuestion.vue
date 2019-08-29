<template>
  <div class="add-question">
    <b-modal id="edit-question">
      <div class="header" slot="modal-header">
        <h4>Update Question</h4>
      </div>
      <div class="body">
        <form>
          <!-- ============= title -->
          <label for>Title:</label>
          <b-form-input placeholder="title ..." v-model="formEditQuestion.title" autocomplete="off"></b-form-input>
          <!-- ============= content -->
          <label for>Question:</label>
          <b-form-textarea
            id="textarea"
            placeholder="ask something..."
            rows="6"
            max-rows="6"
            v-model="formEditQuestion.content"
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
        <button class="btn btn-primary mr-2" @click="updateQuestion(currentQuestion._id)">Update</button>
        <button class="btn btn-danger" @click="cancel()">Cancel</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "@/apis/server.js";
import Swal from 'sweetalert2'

export default {
  props: ["currentQuestion"],
  data() {
    return {
      formEditQuestion: {
        title: "",
        content: "",
        tags: []
      },
      selectedTags: [],
      existingTags: []
    };
  },
  methods: {
    cancel() {
      this.$bvModal.hide("edit-question");
      this.formEditQuestion = { ...this.currentQuestion };
      let formattedTags = [];
      for (let i = 0; i < this.currentQuestion.tags.length; i++) {
        formattedTags.push({ value: this.currentQuestion.tags[i].name });
      }
      this.selectedTags = formattedTags;
    },
    updateQuestion(id) {
      this.$store
        .dispatch("updateQuestion", {
          questionId: id,
          update: this.formEditQuestion
        })
        .then(updated => {
          this.$bvModal.hide("edit-question");
          this.$store.dispatch("fetchOneQuestion", id);
          Swal.fire({
            type: 'success',
            title: 'Successfuly updating your question!'
          })
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    currentQuestion() {
      this.formEditQuestion.title = this.currentQuestion.title;
      this.formEditQuestion.content = this.currentQuestion.content;
      let formattedTags = [];
      for (let i = 0; i < this.currentQuestion.tags.length; i++) {
        this.formEditQuestion.tags.push(this.currentQuestion.tags[i].name);
        formattedTags.push({ value: this.currentQuestion.tags[i].name });
      }
      this.selectedTags = formattedTags;
    },
    selectedTags() {
      this.formEditQuestion.tags = [];
      for (let i = 0; i < this.selectedTags.length; i++) {
        this.formEditQuestion.tags.push(this.selectedTags[i].value);
      }
    }
  },
  created() {
    axios({
      method: "get",
      url: `/tags`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.existingTags.push({ value: data[i].name });
        }
      })
      .catch(err => {
        console.log(err);
      });
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